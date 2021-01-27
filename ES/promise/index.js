Promise.prototype.myCatch = function(callabck){
    return this.then(undefined, function(...args){
       return callabck(...args)
    })
}

Promise.prototype.myFinally = function(callback){
    const csr = this.constructor
    return this.then(
        val => csr.resolve(callback()).then(()=>val), 
        err => csr.resolve(callback()).then(()=> {throw err})
    )
}

Promise.myAll = function(promises){
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)){throw new Error('参数错误')}
        const result = []
        const len = promises.length
        for(let i =0; i< len;i++){
            Promise.resolve(promises[i]).then(val => {
                result.push(val)
                if(i === len-1 && result.length === len) {resolve(result)}
            }, err => {
                reject(err)
            }
            )
        }
    })
    
}

function ajax(method, url, data){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(200 < xhr.status<300 || xhr.status === 304){
                    return resolve(xhr.response)           
                }else{
                    return reject(xhr.response)
                }
            }
        }
        xhr.send(data)
    })
}


