const myPromise = new Promise((resolve, reject)=>{
    console.log("promise start")
    setTimeout(()=>{
        // 过了两秒才将promise状态改变为resolve
        resolve(2)
        console.log("状态变了 resolve")
    }, 2000)
})
console.log("宏任务")

//此时状态已经改变为resolve了，再添加回调函数，也进行了执行。
setTimeout(()=>{
    myPromise.then(console.log)
}, 3000)