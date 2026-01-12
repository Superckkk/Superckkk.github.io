// static/js/search.js

const SearchManager = {
  overlay: null,
  input: null,
  results: null,
  fuse: null,
  searchIndex: null,
  
  init() {
    this.overlay = document.getElementById('searchOverlay');
    this.input = document.getElementById('searchInput');
    this.results = document.getElementById('searchResults');
    
    if (!this.overlay || !this.input) return;
    
    // 绑定事件
    document.getElementById('searchBtn')?.addEventListener('click', () => this.open());
    document.getElementById('searchClose')?.addEventListener('click', () => this.close());
    
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    
    this.input.addEventListener('input', () => this.search());
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl+K 或 Cmd+K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
      // ESC 关闭搜索
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
    
    // 预加载搜索索引
    this.loadSearchIndex();
  },
  
  async loadSearchIndex() {
    try {
      const response = await fetch('/static/search-index.json');
      const data = await response.json();
      this.searchIndex = data.articles;
      
      // 初始化 Fuse.js
      this.fuse = new Fuse(this.searchIndex, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'subtitle', weight: 0.2 },
          { name: 'content', weight: 0.3 },
          { name: 'tags', weight: 0.1 }
        ],
        threshold: 0.3,
        includeMatches: true,
        minMatchCharLength: 2
      });
      
      console.log(`📊 搜索索引已加载: ${this.searchIndex.length} 篇文章`);
    } catch (error) {
      console.error('加载搜索索引失败:', error);
    }
  },
  
  open() {
    this.overlay.classList.add('active');
    this.input.focus();
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    this.overlay.classList.remove('active');
    this.input.value = '';
    this.results.innerHTML = '<div class="search-hint">输入关键词开始搜索...</div>';
    document.body.style.overflow = '';
  },
  
  search() {
    const query = this.input.value.trim();
    
    if (!query) {
      this.results.innerHTML = '<div class="search-hint">输入关键词开始搜索...</div>';
      return;
    }
    
    if (!this.fuse) {
      this.results.innerHTML = '<div class="search-hint">搜索索引加载中...</div>';
      return;
    }
    
    const results = this.fuse.search(query, { limit: 10 });
    
    if (results.length === 0) {
      this.results.innerHTML = `<div class="search-no-results">
        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;"></i>
        <p>未找到与 "<strong>${this.escapeHtml(query)}</strong>" 相关的文章</p>
      </div>`;
      return;
    }
    
    this.results.innerHTML = results.map(result => {
      const item = result.item;
      const title = this.highlightMatch(item.title, result.matches, 'title');
      const content = this.highlightMatch(item.content.substring(0, 150) + '...', result.matches, 'content');
      
      return `<a href="${item.url}" class="search-result-item">
        <div class="search-result-title">${title}</div>
        <div class="search-result-content">${content}</div>
        <div class="search-result-meta">
          <i class="fas fa-calendar-alt"></i> ${item.date}
          ${item.tags.length ? '<i class="fas fa-tags" style="margin-left: 1rem;"></i> ' + item.tags.join(', ') : ''}
        </div>
      </a>`;
    }).join('');
  },
  
  highlightMatch(text, matches, key) {
    if (!matches) return this.escapeHtml(text);
    
    const match = matches.find(m => m.key === key);
    if (!match) return this.escapeHtml(text);
    
    let result = text;
    const indices = match.indices.sort((a, b) => b[0] - a[0]);
    
    for (const [start, end] of indices) {
      if (start < result.length && end < result.length) {
        result = result.substring(0, start) + 
                 '<mark>' + result.substring(start, end + 1) + '</mark>' + 
                 result.substring(end + 1);
      }
    }
    
    return result;
  },
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  SearchManager.init();
});