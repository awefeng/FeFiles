
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

### 实现Animal的bind 让以下代码输出success

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



### 实现Lodash中的get函数

```javascript
function get(obj, path, defaultValue){
    if(obj !== Object(obj)){
        throw new Error('不是对象')
    }
    let pathType = Array.isArray(path) ? 'array' : (typeof path === 'string' ? 'string' : undefined)
    if(!pathType){
        throw new Error('path不符合要求')
    }
    if(pathType === 'array'){
        let result = obj
        for (let key of path) {
            result = result[key]
            if(result === undefined){
                return defaultValue
            }
        }
        return result
    }else if(pathType === 'string'){
        let keys = path.split('.')
        let result = obj
        for (let key of keys) {
            result = result[key]
            if(result === undefined){
                return defaultValue
            }
        }
        return result
    }
    return defaultValue
}

let result = get({name: 'awefeng', info: {one: ['one'], two: 'two'}}, ['info', 'one', 0], 'defaultValue')
console.log(result)
```

### 实现函数结果缓存
```js
// 通过在缓存函数里存储一个闭包 来达到以前执行过 只需要读取
const memorize = function(fn) {
    const cache = {}
    return function(...args) {
      const _args = JSON.stringify(args)
      return cache[_args] || (cache[_args] = fn.apply(fn, args))
    }
  } 
```


### 千分位实现
```javascript
function fun1(number){
	return number.toLocaleString()
}

function fun2(number) {
    return number.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
}

function fun3(number){
     let str1 = number.toString()
     let str2
     if(str1.indexOf('.')> -1){
        str2 = str1.substring(str1.indexOf('.'))
        str1 = str1.substring(0 ,str1.indexOf('.'))
     }
     let arr = []
     let tag = 0
     for(let i = str1.length -1; i>=0;i--){
         arr.push(str1[i])
         tag++
         if(tag === 3){
             tag = 0
             arr.push(',')
         }
     }
     return arr.reverse().join('').concat(str2)
}
```

### 大文件上传

https://juejin.cn/post/6844904046436843527#heading-24

要点：

1. 浏览器文件分片：`Blob.prototype.slice`，将大文件拷贝后生成若干个小文件

   ```javascript
   const FILE_CHUNK_SIZE = 10 * 1024 * 1024 // 10M
   const createFileChunk = (file) => {
     const chunkCounts = Math.ceil(file.size/FILE_CHUNK_SIZE)
     let cur = 0, chunks = []
     while(cur < chunkCounts){
   		chunks.push({file: file.slice(FILE_CHUNK_SIZE*cur, FILE_CHUNK_SIZE*(cur+1))})
       cur++
     }
     
     return chunks
   }
   ```

   

2. 上传分片

   ```javascript
   const uploadChunk = (chunk) => {
   	fetch(api, chunk)
   }
   
   const allUpload = async () => {
    return  chunks.map(async chunk => {
   		await uploadCHunk(chunk)
   	})
   }
   
   await Promise.all(allUpload())
   
   ```

   

3. 服务端合并分片：上传分片，每一次请求发送总的分片数量或者所有分片上传完成后发送合并文件请求。

断电续传：

分片后计算文件hash值，将hash值先传入服务端。后面继续上传的时候，先校验哪些文件是传入完整的，浏览器就知道哪些分片上传了哪些没有上传。



### 虚拟列表

原理：计算出可视窗口渲染元素个数，然后通过监听滚动设置偏移量，动态生成可视窗口里的元素。

1. 先确认两个端口，一个是可视窗口或者是渲染窗口A高度，一个是虚拟列表B总高度
2. 计算出能够渲染的元素个数。
3. 监听滚动，计算出偏移量。
4. 偏移量计算出后，计算处于偏移量当前的元素，重新挂载。



优化： 计算出偏移量以后，进行缓存，某个Index对应的offset是多少。后面再滚动的时候就不用计算。



都是首先计算出视窗A高度，子元素高度，然后计算出能显示的个数，两个div，一个是A的高度，还有一个是整个list的高度，然后根据渲染的scrollTop来确定当前渲染哪些元素。

https://lkangd.com/post/virtual-infinite-scroll/



### React-Router中的单例和监听模式

单例

```javascript
const single = (function (){
    let instantce
    return function(className, args){
        if(instantce){
            return instantce
        }else{
            instantce = new className(...args)
            return instantce
        }
    }
})()

```



### JS的同步链式调用

```javascript
class People{
  constructor(name){
    console.log(`People ${name} init`)
  }
  
  do(thing){
    console.log(`Start to do ${thing}`)
    return this
  }
}

const a = new People('awefeng')

a.do('eat').do('run')
```



### Promise实现一个等待5s

```javascript
async function timeout(interval){
  await new Promise((reslve)=> setTimeout(resolve, interval))
}
```



### JS的异步链式调用

```javascript
function arrange(name){
  const people = {}
  let promise = Promise.resolve()

  people.do = function(thing){
    promise = promise.then(()=>console.log(`Start to do ${thing}`))
    //console.log(`Start to do ${thing}`)
    return people
  }
  people.wait = function(times){
    promise = promise.then(async ()=>{
      console.log(`Wait for ${times}s `)
      await new Promise((resolve)=>setTimeout(resolve, times*1000))
    })
    return people
  }
  people.execute = function(){
    console.log(`${name} is notified`)
    return people
  }
  return people
}

//arrange('william').execute()

arrange('wu').do('eat').wait(5).do('run').execute()
```

### 深拷贝
```js
function cloneDeep(obj){
    function isObject(obj){return obj===Object(obj)}
    if(!isObject(obj)){return obj}
    let newObj = Array.isArray(obj) ? [...obj] : {...obj}
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key]
    })
    return newObj
}
```