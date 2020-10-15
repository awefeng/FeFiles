Promise.reject(2).then(val => val + 2).finally(()=>{
    console.log('finally')
    // finally返回的也是一个promise
}).finally(()=>{
    console.log('finally 返回的也是promise')
})
