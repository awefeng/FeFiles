const myPromise = new Promise((resolve, reject)=>{
    console.log("promise start")
    setTimeout(()=>{
        resolve(2)
        console.log("状态变了 resolve")
    }, 2000)
})
console.log("宏任务")

setTimeout(()=>{
    myPromise.then(console.log)
}, 3000)