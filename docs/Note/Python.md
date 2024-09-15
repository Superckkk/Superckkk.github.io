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
- 集合：   
当我们想访问字典中的元素且希望不包含重复元素时，可以使用集合。集合是Python中一个重要的数据类型，集合中的元素是唯一的，并且没有顺序。集合中的元素可以是任何Python对象。
```python
favorite_languages = {
    'jen': 'python',
    'sarah': 'c',
    'edward': 'ruby',
    'phil': 'python',
    }
for language in set(favorite_languages.values())
    print(language.title())
```
输出的结果为：Python,C,Ruby.可以看到每种语言都只出现了一次。    
可以用一对花括号直接创建集合：
```python
languages = {'python', 'c', 'ruby', 'java'}
```
可以看到集合和字典很像，区别在于集合中没有键值对，且其中的每个元素都是独一无二的。
## 用户输入
- input函数：
input函数接收一个字符串作为参数，并显示在屏幕上，等待用户输入。值得注意的是，input函数会将用户的输入作为字符串返回。
```python
name = input("Please enter your name:") #prompt可以直接写在input 的括号中
print(f"Hello,{name}!")
prompt = "Please enter your age:"
age = input(prompt) #prompt也可以写在变量中，再将变量传给input函数
print(f"You are {age} years old.")
age = int(age) #使用int()函数将字符串转换为整数
```
## 函数
- 如果函数接收一个列表作为参数，那么在函数中对列表的修改将是永久的，就像C语言中向函数传递指针一样。 
但是，我们也可以通过向函数传递列表的副本避免对列表的修改：
```python
function_name(list_name[:])
```
list_name[:]是由切片表示法创建的列表的副本
- 传递任意数量的参数：
我们可以在形参前加上*，使得函数可以接收任意数量的实参：
```python 
def make_pizza(*toppings):
```
括号中的*让Python创建一个名为toppings的空元组，并将收到的所有值都封装到这个元组中。值得注意的是，如果我们要使用变长参数，那么函数中的形参必须位于所有形参的最后，否则编译器将无法将实参与形参一一对应。
- 使用任意数量的关键字实参（原书的这个标题一直读不懂）
我们可以在形参前加上**，这会让Python创建一个空字典，并将接收到的所有键值对封装到这个字典中。
```python
def build_profile(first, last, **user_info):
    user_info['first_name'] = first
    user_info['last_name'] = last
    return user_info
user_profile = build_profile('albert', 'einstein', location='princeton', field='physics')
print(user_profile)
```
输出结果为：
```bash
{'location': 'princeton', 'field': 'physics', 'first_name': 'albert', 'last_name': 'einstein'}  
```
可以看到，Python将键值对location:'princeton'和field:'physics'封装到字典user_info中，并将键first_name和last_name的值分别设置为'albert'和'einstein'。
一个常见的形参名是\*\*kwargs，它被⽤于收集任意数量的关键字实参
## 类
>“⾯向对象编程（object-oriented programming，OOP）是最有效的软件编写⽅法之⼀。在⾯向对象编程中，你编写表⽰现实世界中的事物和情
景的类（class），并基于这些类来创建对象（object）。在编写类时，你要定义⼀批对象都具备的通⽤⾏为。在基于类创建对象时，每个对
象都⾃动具备这种通⽤⾏为。然后，你可根据需要赋予每个对象独特的个性。使⽤⾯向对象编程可模拟现实情景，逼真程度到达了令⼈惊讶的地步。”

- 类的创建：创建类时，必须使用class关键字，类名必须以大写字母开头，类名通常以驼峰命名法（CamelCase）来命名，类名应该与文件名相同。
```python
class Dog: #创建一个Dog类
    def __init__(self, name, age):#Dog的名字和年龄
        self.name = name
        self.age = age
    
    def sit(self): #模拟小狗收到命令时蹲下
        print(f"{self.name} is now sitting.")

    def roll_over(self): #模拟小狗收到命令时打滚
        print(f"{self.name} rolled over!")
```
    - __init__()方法：
    类中的函数称为方法，而__init__()是一个特殊方法，在创建对象时自动执行。在__init__()方法中，self参数是必须的，它代表类的实例本身，必须位于其他参数的前面。但我们无需向self传递实参，因为每个与实例相关联的方法调用都会自动传递实参self，该参数让实例能够访问类中的属性和方法。__init__()方法中定义的变量有self前缀时，可供类中的所有方法使用，可通过类的任意实例访问。像这样可以通过实例访问的变量称为属性（attribute）
- 创建实例和调用方法：
```python
my_dog = Dog('willie', 6)
print(f"My dog's name is {my_dog.name}.")
print(f"My dog is {my_dog.age} years old.")
my_dog.sit() #可以使用点号调用类中定义的方法
my_dog.roll_over()
```
输出结果为：
```bash
My dog's name is willie.
My dog is 6 years old.
willie is now sitting.
willie rolled over!
```
- 继承：
如果要编写的类是一个既有的类的特殊版本，可以使用继承（inheritance）来简化代码。
```python
class Car:
    def __init__(self, make, model, year): #初始化描述汽车的属性
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0
    
    def get_descriptive_name(self):
        long_name = f"{self.year} {self.make} {self.model}"
        return long_name.title()
    
    def read_odometer(self): #打印出汽车的里程表
        print(f"This car has {self.odometer_reading} miles on it.")
    
    def update_odometer(self, mileage): #更新里程表
        if mileage >= self.odometer_reading:
            self.odometer_reading = mileage
        else:
            print("You can't roll back an odometer!")
    
    def increment_odometer(self, miles): #增加里程表读数
        self.odometer_reading += miles

class ElectricCar(Car): #ElectricCar类继承自Car类
    def __init__(self, make, model, year):
        super().__init__(make, model, year) #初始化父类的属性
        self.battery_size = 70 #新增属性“battery_size”
    
    def describe_battery(self): #打印电池容量
        print(f"This car has a {self.battery_size}-kWh battery.")
    
    def fill_gas_tank(self): #重写父类的方法
        print("This car doesn't need a gas tank!")

```
super()是一个特殊的函数，用于调用父类的方法。父类有时也被称为超类（superclass）。如果父类中的某些方法对子类不适用，可以在子类中重写这个方法。

## 文件和异常
- 读取文件：
假设在C:\Coding\Python\pi.txt中写入了$\pi$的前几位。
```python
from path import Path
path = Path('C:\\Coding\\Python\\pi.txt')
contents = path.read_text()
print(contents)
```

