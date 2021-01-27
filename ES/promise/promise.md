#### Promise的状态

1. `Promise`有三个状态：`pending`, `fulfilled`, `rejected`

2. 状态变化只有两种：`pending -> fulfilled`或`pending -> rejected` 

3. 状态改变后，不会在改变。

4. 状态不会受外部影响，只受`promise`内部的逻辑影响

5. 状态改变以后再添加回调（`then catch`），也会执行。（与事件`event`不一样）

6. 缺点：不能取消，`promise`状态不可知

   

   例子：[promise的状态](./promise的状态.ts)



#### Promise构造函数

Promise构造函数接受一个回调函数作为参数，这个回调函数有两个参数：

1. resovle函数，作用是将promise的状态从pending变为resolved（fulfilled），抛出参数
2. reject函数，作用是将promise状态从pending改变为rejected，抛出参数



promise在新建 （new promise）的时候就会执行



resolve：

promise A的resolve函数可以抛出参数，也可以抛出下一个promise B，这个时候resolve函数不能决定promise A的状态，只能是promise B返回的状态来决定promise A



`promise`中调用`resolve`或者`reject`以后，后面的代码还是会执行，除非显示的调用`return`

`promise`中调用`return`以后，后面的代码就不会执行了，包括`resolve`和`reject`



#### Promise的实例方法(指定义在原型链上的)

`Promise.prototype.then`：

`promise`的`.then`方法两个函数参数：`resolve`后的回调和`reject`后的回调。

```javascript
const p = new Promise((resolve, reject) => {
  reject(2)
})

p.then(null, console.log).then(()=>{
  console.log('then后的then')
})
// 2
// 用.then实现了.catch
```

then方法会返回一个新的promise实例，不是原来那个。

`promsie`中的`then`会返回一个新的`promise`，因此有链式调用`.then().then()`



`Promise.prototype.catch`：

```js
Promise.prototype.catch = function(callback){
  return this.then(undefined, function(...args){ return callback(...args)})
}
```



`promise`中的`catch`其实就是`.then(undefined, rejectFunc)`

因为`.catch`其实是`.then`的语法糖，所以`.catch`也是返回的一个`promise`，因此也可以`.catch().then()`

​	`promise`状态改变以后，就不会再改变了，比如已经`resolve`了，再去后面抛一个异常，`promise`后面的`catch`是捕获不到异常的

​	`promise`的`finally`也是返回一个`promise`

promise里面如果抛出异常，在外面的代码上还是能继续执行，不会因为异常而中断。（node实现了一个监听错误的函数。会返回exit 非零，进程结束，后期会废除）



`Promise.prototype.finally`

```javascript
// 用.then实现.finally
const p = new Promise((resolve, reject) => {
  settime(()=>{
		resolve(2)
  }, 2000)
})
const finallTodo = ()=>{console.log('finally')}
p.then(finallTodo, finallTodo) // 相当于 p.finally(finallTodo)

// 但是finally返回的是promise 这个状态是.finally之前的状态

Promise.prototype.finally = function(callback){
  cosnt _P = this.constructor
  return this.then(
    val => _P.resolve(callback()).then(()=>val), 
    err => _P.resolve(callback()).then(() => {throw err})
  )
}
```



#### Promise静态方法

1. promise.all 

   传入一组promise对象arr，arr中的promise会同时执行异步任务，当arr所有的promise对象都已经fullfiled的时候，promise.all返回的promsie对象才是fullfiled，arr里面一旦有一个rejected，arr中后面的promise不会执行，promise.all会直接返回一个rejected对象。

```js
Promise.all = function (promises){
  return new Promise((resolve, reject) => {
  	if(!Array.isArray(promises)){
      throw new Error('arguments is not a array')
    }
		const result = []
    const len = promises.length
    for(let i=0;i<len;i++){
			Promise.resolve(promises[i]).then(
      	val => {
          result.push(val)
          if(i === len-1 && result.lenth === len){
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
```



1. promise.race

   和all类似，但是当传入的promisie数组中第一个异步任务结束，不管是fullfied还是rejected，promise.race都会返回一个promise

2. promise.any

   和race类似，但是执行完所有的promise以后才返回。

3. promise.allSettled 

   es2020新的promise静态方法，会执行完所有的promise不管是否rejected。而且allSettled返回的是一个状态为fulfilled的promise，value是promise数组的返回结果和状态。



