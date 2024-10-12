#include<stdio.h>
#include<stdlib.h>
#define ElementType int

#ifndef _SplayTree_H
struct SplayTreeNode;
typedef struct SplayTreeNode * SplayTree;
typedef struct SplayTreeNode * Position;

SplayTree MakeEmpty();
void Zig(SplayTree);
void Zag(SplayTree);
void ZigZig(SplayTree);
void ZagZag(SplayTree);
void ZigZag(SplayTree);
void ZagZig(SplayTree);
int isLeftChild(SplayTree);
int isRightChild(SplayTree);
void Splay(SplayTree);
SplayTree Find(SplayTree, ElementType);
SplayTree Insert(SplayTree, ElementType);
SplayTree Delete(SplayTree, ElementType);
#endif

typedef struct SplayTreeNode * SplayTree,Position;

struct SplayTreeNode{
    ElementType Element;
    SplayTree Left;
    SplayTree Right;
    SplayTree Parent;
};