// 1 观察者 为每个key定义观察函数
function observe(obj){
    function isObject(obj){return Object(obj) === obj}
    if(!isObject(obj)){return obj}
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
        isObject(obj[key]) ?  observe(obj) : undefined
    })
}

function defineReactive(data, key, value){
    // 1. 每个key 可能有多个监听函数
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        set(newValue){
            console.log(`监听到赋值${key}: ${value} => ${newValue}`)
            value = newValue
            // 监听到值的变化需要通知watcher进行触发
            dep.sub.forEach(watcher => {
                watcher.notify()
            })
        },
        get(){
            // 获取的时候将watcher加入
            if(Dep.watcher){
                console.log(`订阅${key}`)
                dep.add(Dep.watcher)
            }
            return value
        }
    })
}

class Dep{
    constructor(){
        this.sub = []
    }
    // 推入监听的watcher
    add(watcher){
        this.sub.push(watcher)
    }
}
Dep.prototype.watcher = null

class Watcher{
    constructor(obj, key, callback){
        this.callback = callback
        this.obj = obj
        this.key = key
        // 将Dep.watcher指向自己
        Dep.watcher = this
        // obj[key]会触发get
        this.value = obj[key]
        
        // 触发后清空
        Dep.watcher = null
    }
    notify(){
        // 通知的时候重新赋值
        this.value = this.obj[this.key]
        this.callback(this.obj, this.key, this.value)
    }
}

let obj = {name: 'awefeng'}

observe(obj)
let updateDom = (obj, key, value)=>{
    console.log(JSON.stringify(obj))
    console.log(key, value)
}
new Watcher(obj, 'name', updateDom)

obj.name = 'xxx'