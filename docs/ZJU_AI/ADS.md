# ADS 

## Chapter 1: AVL树

AVL树是带有平衡条件的二叉查找树，在结点结构中需要记录以其为根结点的子树的高度，要求每个结点的左右子树的高度差不超过1。

在高度为h的AVL树中最少结点数$S(h)$由$S(h)=S(h-1)+S(h-2)+1$给出，且$S(0)=1$,$S(1)=2$。由此可见，$S(h)$与斐波那契数密切相关。实际上S(h) = F(h+2)-1

AVL树通过引入平衡条件，避免出现一些极端情况(如退化成链表)，保证了二叉查找树的查找、插入、删除操作的时间复杂度均为$O(logn)$

若将需要重新平衡的节点叫做a，则破坏平衡的情况有以下四种：

- LL：对a的左儿子的左子树进行一次插入
- RR：对a的右儿子的右字数进行一次插入
- LR：对a的左儿子的右子树进行一次插入
- RL：对a的右儿子的左子树进行一次插入
其中LL，RR两种情况下只需要一次旋转，而RL，LR则需要两次旋转。

代码实现：
```C
#ifndef _AvlTree_H

struct AvlNode;
typedef struct AvlNode *Position;
typedef struct AvlNode *AvlTree;

AvlTree MakeEmpty(AvlTree T);
Position Find(ElementType X, AvlTree T);
Position FindMin(AvlTree T);
Position FindMax(AvlTree T);
AvlTree Insert(ElementType X, AvlTree T);
AvlTree Delete(ElementType X, AvlTree T);
ElementType Retrieve(Position P);

#endif

struct AvlNode{ //结点声明
    ElementType Element;
    AvlTree Left;
    AvlTree Right;
    int Height;
}

int Height(Position P){
    if(P == NULL)
        return -1;
    else 
        return P->Height;
}

Insert(ElementType X, AvlTree T){
    if(T == NULL){
        T = malloc(sizeof(struct AvlNode));
        if(T == NULL){
            Error("Out of space!!!");
        }else{
            T->Element = X;
            T->Left = T->Right = NULL;
            T->Height = 0;
        }
    }else if(X < T->Element){
        T->Left = Insert(X, T->Left);
        if(Height(T->Left) - Height(T->Right) == 2){
            if(X < T->Left->Element)
                T = SingleRotateWithLeft(T);
            else
                T = DoubleRotateWithLeft(T);
        }
    }else if(X > T->Element){
        T->Right = Insert(X, T->Right);
        if(Height(T->Right) - Height(T->Left) == 2){
            if(X > T->Right->Element)
                T = SingleRotateWithRight(T);
            else
                T = DoubleRotateWithRight(T);
        }
    }
    T->Height = Max(Height(T->Left), Height(T->Right)) + 1;
    return T;
}
Position SingleRotateWithLeft(Position K2){//K2有左孩子，其左孩子旋转后为新的父节点
    Position K1;
    K1 = K2->Left;
    K2->Left = K1->Right;
    K1->Right = K2;
    K2->Height = Max(Height(K2->Left), Height(K2->Right)) + 1;
    K1->Height = Max(Height(K1->Left), K2->Height) + 1;
    return K1;
}
Position DoubleRotateWithLeft(Position K3){//K3有左孩子，其左孩子的右孩子旋转后为新的父节点
    K3->Left = SingleRotateWithRight(K3->Left);
    return SingleRotateWithLeft(K3);
}
```

## Chapter 2: 伸展树

伸展树(Splay Tree)，是一种自平衡的二叉查找树，在访问伸展树中的某一个结点后，会通过一系列操作将该结点移动到树的根结点，使得再次访问该结点所需要的时间减少。一种简单的想法是在找到待访问结点后不断应用单旋转，直到将该结点移动到树的根结点。但是该方法存在较大的局限性。当面对退化成链表的二叉搜索树时，在访问完所有结点后，树又会恢复成原来的模样，且在过程中始终处于这种极端情况下，这无法减少多次访问结点所需的时间。
