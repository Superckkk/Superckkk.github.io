// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
  // ========== 主题切换系统 ==========
  const ThemeManager = {
    storageKey: 'blog-theme',
    defaultTheme: 'light-gray',
    
    init() {
      const savedTheme = localStorage.getItem(this.storageKey) || this.defaultTheme;
      this.setTheme(savedTheme);
      
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const theme = btn.dataset.theme;
          this.setTheme(theme);
        });
      });
    },
    
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.storageKey, theme);
      
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
      });
    }
  };
  
  // ========== 侧边栏折叠 ==========
  const SidebarManager = {
    init() {
      document.querySelectorAll('.nav-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const navItem = toggle.closest('.nav-item');
          navItem.classList.toggle('expanded');
        });
      });
      
      document.querySelectorAll('.nav-item.has-active').forEach(item => {
        item.classList.add('expanded');
      });
    }
  };
  
  // ========== 移动端菜单 ==========
  const MobileMenu = {
    init() {
      const menuBtn = document.querySelector('.mobile-menu-btn');
      const sidebar = document.querySelector('.side-navbar');
      
      if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
          sidebar.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
          if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
          }
        });
      }
    }
  };
  
  // ========== 阅读进度条 ==========
  const ReadingProgress = {
    init() {
      const progressBar = document.querySelector('.reading-progress');
      if (!progressBar) return;
      
      window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
      });
    }
  };
  
  // ========== 返回顶部按钮 ==========
  const BackToTop = {
    init() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;
      
      // 监听滚动，控制按钮显示/隐藏
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
      
      // 点击返回顶部
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };
  
  // ========== 平滑滚动 ==========
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  };
  
  // ========== 初始化 ==========
  ThemeManager.init();
  SidebarManager.init();
  MobileMenu.init();
  ReadingProgress.init();
  BackToTop.init();
  SmoothScroll.init();
});