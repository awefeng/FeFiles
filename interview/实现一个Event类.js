// 实现一个event类 含有 on off once trigger
class Event{
    constructor(){
        // 用来缓存时间类型以及事件回调函数
        this._cache = {}
    }
    // 绑定事件
    on(type, cb){
        this._cache[type] = this._cache[type] || []
        this._cache[type].includes(cb) ? undefined : this._cache[type].push(cb)
    }
    // 解绑事件 如果没传事件 则全部清空 清空不能用 =[] 这是赋值一个新的空数组
    off(type, cb){
        if(cb){
            let index = this._cache[type].indexOf(cb)
            if(index >= 0){
                this._cache[type].splice(index, 1)
            }
        }else{
            this._cache[type].length = 0
        }
        
    }
    // 触发 ，类型和参数
    emit(type, ...args){
        let cbs = this._cache[type] || []
        if(cbs.length > 0){
            cbs.forEach(cb =>{
                cb(...args)
            })
        }
    }

    // 只执行一次
    once(type, cb){
        let wrapFunc = (...args) => {
            cb.apply(this,args)
            this.off(type, wrapFunc)
        }
        this.on(type, wrapFunc)
    }
}
