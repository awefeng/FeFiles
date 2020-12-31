const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function MyPromise(callback){
    const _this = this
    _this.value = undefined
    _this.status = PENDING
    _this.resolveCallbacks = []
    _this.rejectCallbacks = []
    try {
        callback(resolve, reject)
    } catch (error) {
        reject(error)
    }
    function resolve(value){
        if(_this.status === PENDING){
            _this.value = value
            _this.status = RESOLVED
            _this.resolveCallbacks.forEach(cb => cb(value))
        }
    }
    function reject(value){
        if(_this.status === PENDING){
            _this.status = REJECTED
            _this.value = value
            _this.rejectCallbacks.forEach(cb => cb(value))
        }
    }
}

MyPromise.prototype.then = function(onResolved, onRejected){
    const _this = this
    typeof onResolved === 'function' ? undefined : (onResolved = v => v)
    typeof onRejected === 'function' ? undefined : (onRejected = v => { throw new Error(v)})
    if(_this.status === PENDING){
        this.rejectCallbacks.push(onRejected)
        this.resolveCallbacks.push(onResolved)
    }
    if(_this.status === RESOLVED){
        onResolved(_this.value)
    }
    if(_this.status === REJECTED){
        onRejected(_this.value)
    }
}

new MyPromise((resolve, reject)=>{
    'xxxx'
    resolve('xx')
}).then().then()



// 还需要补充的  边界处理 then返回promise then的链式调用 第二个then返回的promise不能和最开始的相同检测
