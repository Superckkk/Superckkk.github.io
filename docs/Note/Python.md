# Python

本页面为自学时记录的Python笔记，自学使用的教材为Eric Matthes所著的《Python编程从入门到实践3rd》

## Zon of Python
在Python中，Zen of Python是Python的哲学，输入`import this`即可在输出终端中看到以下内容：
>The Zen of Python, by Tim Peters    
Beautiful is better than ugly.  
Explicit is better than implicit.   
Simple is better than complex.  
Complex is better than complicated.     
Flat is better than nested.     
Sparse is better than dense.    
Readability counts.     
Special cases aren't special enough to break the rules.      
Although practicality beats purity. 
Errors should never pass silently.  
Unless explicitly silenced.     
In the face of ambiguity, refuse the temptation to guess.   
There should be one-- and preferably only one --obvious way to do it.        
Although that way may not be obvious at first unless you're Dutch.   
Now is better than never.   
Although never is often better than *right* now.    
If the implementation is hard to explain, it's a bad idea.  
If the implementation is easy to explain, it may be a good idea.    
Namespaces are one honking great idea -- let's do more of those!    
## 操作列表
### 元组
元组是不可变的列表，其中的元素不能被修改。然而元组本身是可以被重新赋值的。如： 
```python
dimention = (200, 50)#定义元组
dimention[0] = 100 #TypeError: 'tuple' object does not support item assignment 
dimention = (100, 50)#no error
```
访问元组中元素的方式与列表相同。值得注意的是，严格说来，元组是由逗号标识的，圆括号只是让元组看起来更清晰。即使元组中只包含一个元素（自动生成的元组有可能只有一个元素），也必须在元素后面加上括号。如：
```python
dimention = (200,)
```
## 字典
Python中的字典是一系列键值对，每个键都与一个值相关联，因此可以通过键来访问与之对应的值。字典中的值可以是任意Python对象。    
在形式上，Python中的字典与C语言中的结构体类似。Python中，字典由放在花括号中的一系列键值对表示，键和值之间用冒号分隔，而键值对直接用逗号分隔。可以使用以下代码创建一个字典：
```python
student_0 = {'name': 'Alice', 'age': 20, 'sex': 'female'} #创建字典'student_0'
#也可以写成下面这种形式，使得代码更加易读
student_1 = { 
    'name':'Bob',
    'age':21,
    'sex':'male',#最后一个键值对后面的逗号可以不加
    }
#创建一个空字典
student_2 = {}
```
- 访问字典中的元素：    
访问字典中元素的方法与访问列表中元素的方法类似：
```python
print(student_0['name'])
```
- 添加元素：    
可以向字典中直接添加键值对，如：
```python
student_0['address'] = 'Beijing'
print(student_0)
```
- 修改字典中的值：  
修改字典中元素的方法与修改列表中元素的方法类似：
```python
student_0['age'] = 18
print(student_0)
```
- 删除键值对：  
可使用del语句删除字典中的键值对：
```python
del student_0['address']
print(student_0)
```
- 使用get()访问字典中的值：  
当我们使用方括号获取字典中的值时，若指定的键不存在，编译器就会报错甚至有可能崩溃。get()方法可以避免这种情况。
```python 
student_0 = {'name': 'Alice', 'age': 20, 'sex': 'female'}
score_value = student_0.get('score', 'No score value assigned')
print(score_value)
```
该段代码使用get获取字典中score的值，若该键值对不存在，则返回默认值——即第二个参数——No score value assigned。若没有指定默认值，则返回None。
- 遍历字典：    
当我们需要访问字典中的所有信息时，可以使用for循环遍历字典。
```python
student_0 = {'name': 'Alice', 'age': 20, 'sex': 'female'}
for key,value in student_0.items():
    print(f"\nkey:{key}")
    print(f"value:{value}")
for key in student_0.keys():
    print(f"key:{key}")
for value in student_0.values():
    print(f"value:{value}")
```
这三个循环分别遍历了字典中的键值对，键，和值。.items方法会返回一个键值对，并将键和值分别赋值给指定的变量key和value，.keys方法则只返回键，.values方法则只返回值。我们可以任意修改变量名称，是其更符合实际使用场景。值得一提的是，for循环在遍历时默认遍历所有的键，因此`for key in student_0.keys()`和`for key in student_0`的效果是一样的。
##
