#### let const var的区别

let const是ES6新增的声明方式

1. let const不会有变量提升，var会有变量提升的问题，let const有暂时性锁区。
2. let const不允许重复声明，而var允许重复声明。
3. let const声明的变量或者常量不会被挂载到全局对象上。



const 本质是保持栈中的指针不变，对象的内容可以变。所以声明的时候可以用`Object.freeze()`进行冻结。



#### 函数

ES6中 函数参数允许设置默认值，但是设置默认值会导致函数length值失真

```javascript
function add(x, y=1){return x+y}
add.length // 1

function add(...args){return args.reduce((a,b)=> a+b)} 
add.length // 0
```



#### 箭头函数

1. 箭头函数中的this对象就是在声明的时候就决定了，不会是在调用的时候动态获取上下文。JS里面this就是执行的上下文
2. 不可以当成构造函数使用，会报错（因为this的指向确定了，new操作符工作步骤之一就是初始化一个对象并且将构造函数的this指向这个对象）
3. 不可以使用arguments
4. 不可以使用yield，不能作为生成器函数(Generator)



#### for ... in 和 for ... of

1. for...in 遍历可以遍历的对象属性，包括继承来的
2. for...of也是遍历，遍历的是value，一般用于数组



#### Set Map数据结构

Map 映射

Set 集合

Set：和数组类似，里面的元素不能重复。new Set（接受一个具有可迭代iterable的数据）。



