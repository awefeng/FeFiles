

const myPromise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.info("异步时间结束，变为reject")
        // return 在这return 则后面的reject 或者resolve都不会执行 
        reject(new Error('错误'))
        console.log("promise reject或者resolve后，不会停止后面的代码执行")
    }, 2000)
})
function catchReject(value){
    console.log(`promise rejected: value - ${value}`)
}
// 1. then方法两个参数: promise resolve后的处理函数，以及promise reject后的处理函数
myPromise1.then(console.log, catchReject)

const myPromise2 = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        console.log("promise 2")
    }, 1000)
})