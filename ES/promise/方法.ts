const promise1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log("promise1 resolve")
        // resolve里面包含promise(比如x)的 则会等x的状态返回，然后返回这个状态
        resolve(promise2)
    }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
    console.log("第一个")
    reject("promise2 reject")
})

promise1.then(console.log).catch((val)=>{
    console.log("catch")
    console.log(val)
    throw new Error("catch 中抛出一个新的异常")
}).then(undefined, val => console.log('catch 后的 then', val))

//.catch 其实就是.then(null | undefined, ()=>{})

const promise3 = new Promise((resolve, reject) => {
    resolve('resolve了')
    // 状态一旦改变以后，后面的再去改变状态的代码就不会生效 后面两行都不会生效
    reject("reject")
    throw new Error("resolve后的错误")
})

promise3.then(console.log, console.log)