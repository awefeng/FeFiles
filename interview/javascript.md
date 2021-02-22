#### JS数据类型

基本类型：undefined null boolean number string symbol  (bigint)

引用类型：object

#### typeof

用于判断数据的类型，但是对引用类型不能准确判断

```javascript
typeof 'awefeng' // string
typeof 2 //number
typeof undefined //undefined
typeof true //boolean

typeof null //object 历史原因
typeof symbol //symbol

function a(){}

typeof a //function

a = {}
typeof a //object
a = []
typeof a //object
```



#### null undefined 和 boolean

1. null 和undefined 都表示无，但是`typeof null // 'object'`
2. boolean值只有true和false，JavaScript在预期要转换为boolean的地方就会进行转换，`null undefined '' "" NaN 0 `都换转为false



#### 判断对象

```javascript
function isObject1(obj){
  return obj === Object(obj)
}

// React里面
function isObject2(obj){
  return (typeof obj === 'object' typeof obj === 'function') && obj !==null
}

Object.prototype.toString.call(obj)
```



#### 对象

in 操作符：

用来检查哪些属性在对象中，但是不能识别哪些对象是自身的，排除不了继承的；检测自身属性用`hasOwnProperty`

for ... in : 循环 + in 

遍历属性，排除不了继承的，因为是遍历，如果属性规定了不能遍历，则也遍历不出来。所以要遍历自身的属性 for...in + hasOwnProperty

```javascript
const a = {aa: 'aa'}
'aa' in a // true
'toString' in a //true
a.hasOwnProperty('aa')  // true

for(let key in a){
	if(a.hasOwnProperty(key)){//TODO}
}
```



#### 函数

函数是变量，也会有自己的属性，在声明函数的时候也会存在这变量提升的问题。

函数的属性：

```js
function a(x){return x}

a.name = 'a' // 函数的名称
a.length = 1 // 函数的参数个数
a.toString() // 继承对象的方法 返回的是函数的源码  原生函数返回的是Native Code

```

函数变量提升：

对于function 和var 都会存在变量提升这个问题：提升会首先声明这个变量然后=undefined ，最后到写代码的行数进行赋值

```js
function a(){
	console.log(a) // undefined
	var a = 1
}
//实际
function a(){
	var a = undefined
  console.log(a)
  a = 1
}
```



arguments:

是一个对象，类似数组可以通过参数出现的位置进行访问，但是不是数组。



#### 标准库

Object()： Object() 和Object是有区别的： 一个是构造函数，也可以当工具函数，一个是Object对象，但是本质上是一样的。都是Object类

1. Object() 可以作为一个包装函数。传入的基本类型值就会包装成对应值的类型的对象，传入对象则返回其本身。

   ```javascript
   const aObj = Object(1)
   aObj instanceoof Number // true
   const bObj = Object(aObj)
   aObj === bObj  // true
   ```

2. Object()作为构造函数

   ```javascript
   const a = ['a', 'b']
   Object.keys(a) // 0 ,1
   Object.getOwnPropertyNames(a) // 0 ,1 ,toString
   
   ```

   


Array：

push pop shift unshift reverse splice sort  // 会改变原来的数组

join concat slice map forEach filter some every reduce indexof // 不会改变原来的数组





#### New 命令

new命令 是用来运行构造函数

原理：

1. 创建一个空对象，并将这个空对象的原型指向构造函数的`prototype`

2. 将构造函数中的this指向这个对象

3. 运行构造函数代码

4. 如果构造函数有明确的一个对象而不是数值或者其他的，则会返回这个return语句后面的值；否则返回这个新生成的对象。

   ```javascript
   function Student(name){
       this.name = name
       return function a(){console.log('aa')}
   }
   console.log(new Student('aw')) // function a(){console.log('aa')}
   ```

自定义实现

```javascript
function _new(...args){
	const constructor = args.shift()
  // 第一步
  const obj = Object.create(constructor.prototype)
  // 第二步 第三步
  const result = constructor.apply(obj, args)
  // 第四部
  return result === Object(result) ? result : obj
}
```



如果执行构造函数的时候忘了加`new`， 则会按照普通函数执行，防止这种情况可以：

1. 构造函数里面用`use strict`来限制死this。

   ```javascript
   function Stu(name){
     'use strict'
     this.name = name
   }
   Stu() //报错 全局模式下this是undefined
   
   ```

2. 检测this指向，如果this不是代表的当前构造函数的Instance，就报错或者自己给他声明一个

   ```javascript
   function Stu(name){
   	if(!(this instanceof Stu){
   		return new Stu(name)
     }
     this.name = name
   }
   ```



#### this

this指向的是当前执行栈中的上下文，涉及到作用域、函数参数、内存对象等。this和作用域是不一样的，不要轻易认为this就是指向的当前作用域。

**如果将this显示的指定给一个对象（比如用call apply bind），则这个时候按照JS的赋值操作。this就是指向了这个对象了。**



call：绑定运行函数的this指向，然后运行

apply：绑定运行函数的this指向，然后运行，和call区别就是后面可以加参数

bind：绑定运行函数的this指向，然后返回一个新的函数



手写call：

```javascript
Function.prot0type.myCall = function(_this){
	_this.func = this
  const result = _this.func()
  delete _this.func
  return result
}
```

手写apply：

```javascript
Function.prototype.myApply = function(...args){
	const _this = args.shift()
  _this.func = this
	const result =  _this.func(...args)
  delete _this.func
  return result
}
```

手写bind：

```javascript
Function.prototype.myBind = function(_this){
	const fbind = funciton(...args){
    return this.apply(_this, ...args)
  }
  return fbind
}
```



#### 原型链

原型的出现：一些对象共用一些属性或者方法，就出现了原型。原型是一个object，保存了共用的方法和属性。object都有自己的原型（除了null），所以对象的原型也有自己的原型。从而形成了原型链，所有对象的原型链顶端都是Object.prototype，然后Object.prototype的原型是null，用来终止原型链：`Object.getPrototypeOf(Object.prototype)  // null`



当读取一个对象的属性的时候，如果对象有这个属性就返回，没有就去原型链上找，向上递归。

instanceof



#### 继承

继承就是把一个对象的属性和方法也作为自己的属性和方法，也就是说不光是实例上的属性和方法，还有原型链上的实例和方法。

```js
function Animal(name){
  this.name = name
}

function Cat(){
  Animal.call(this, arguments)
  this.shut = 'miao'
}

Cat.prototype = new Animal()
// Cat原型链指正以后 需要正确指向构造函数
Cat.prototype.constructor = Cat

```



#### 异步模型

##### 单线程

JS单线程指的是一个JS脚本里的任务只能按顺序执行，只在一个线程里面运行。执行机制 EventLoop

并不是javascript引擎只能运行一个线程。

EventLoop：见es文件夹Eventloop



