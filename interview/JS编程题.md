
### 1. 实现同步链式调用
```js
class People{
  constructor(name){
    this.name = name
  }
  do(thing){
    console.log(`Start to doo ${thing}`)
    return this
  }
  wait(thing){
    console.log(`Wait`)
    return this
  }
}

// new People('awefeng').do('eat').wait().do('run')
```

### 2. curry实现 add(1,2,3)(1,2)(1)(1,2,2,2)()
```js
function add(...args){
  return args.reduce((a, b)=> a+b)
}

function curry1(fn){
  let args = []
  return function temp(...newArgs){
    if(newArgs.length){
      args.push(...newArgs)
      return temp
    }
    else{
      return fn.apply(this, args)
    }
  }
}
const curryAdd1 = curry1(add)
// 后面带括号的
const reuslt1 = curryAdd1(1,2,3)(1,2)(1)(1,2,3,5)()
```
### 3. curry实现 add(1,2,3)(1,2)(1)(1,2,2,2) 打印的时候能够输出结果
```js
function sum(...args){
  function temp(...newArgs){
    return sum(add(...args, ...newArgs))
  }
  temp.toString = ()=> add(...args)
  return temp
}

const result = sum(1,2,3)(2,3,4)(1,2,3)(1)
console.log(result)

```

### 实现Promise.all
```js
// 接收的是array或者能够遍历的数据结构
Promise.myAll = function(promises){
  if(!promises[Symbol.iterator]){
    throw new Error('参数错误')
  }
  let result = []
  let len = 0
  return new Promise((resolve, reject)=>{
    for(let pro in promises){
      len++
      Promise.resolve(pro).then(
        val => {
          result.push(val)
          if(result.length === len){
            return resolve(result)
          }
        },
        err => {
          return reject(err)
        }
      )
    }
  })
}

Promise.myAll([1,2,3]).then(console.log)
```

#### 实现Promise.prototype.catch

```js
Promise.prototype.mcatch = function(fb){
  return this.then(undefined, fb)
}

new Promise((_, reject)=>{
  reject(2)
}).mcatch(console.log)
```

### 实现Promise.protoype.finally

```js
Promise.prototype.mfinally = function(cb){
  return this.then(
    cal => Promise.resolve(cb()).then(()=>val),
    err => Promise.resolve(cb()).then(()=>{throw err})
  )
}
```


#### 实现Animal的bind 让以下代码输出success
```js
  function Animal(name,color){
    this.name = name;
    this.color = color;
  }
  Animal.prototype.say = function(){
    return `I'm a ${this.color}${this.name}`;
  }
  const Cat = Animal.bind(null,'cat');
  const cat = new Cat('white');
  if(cat.say() === "I'm white cat" && cat instanceof Cat && cat instanceof Animal){
    console.log('sunccess');
  }
```
```js
function Animal(name,color){
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function(){
  return `I'm a ${this.color} ${this.name}`;
}
Animal.bind = function(_, name){
  function Some(color){
    this.color = color
    this.name = name
  }
  Some.prototype = Object.create(Animal.prototype)
  Some.prototype.constructor = Some
  return Some
}

const Cat = Animal.bind(null,'cat');
const cat = new Cat('white');
console.log(cat.say())
console.log(cat instanceof Cat)
console.log(cat instanceof Animal)
if(cat.say() === "I'm white cat" && cat instanceof Cat && cat instanceof Animal){
  console.log('sunccess');
}
```