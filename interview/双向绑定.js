// 1. 获取对象的属性并监听
// 2. 数据变动的时候去通知订阅者
function observe(data){
    function isObject(val){
        return val === Object(val)
    }
    if(!isObject(data)){
        return
    }
    Object.keys(data).forEach(key => {
        defineReactive(data[key], key, data)
        isObject(data[key]) ? observe(data[key]) : undefined
    })
}
function defineReactive(value, key, data){
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            // 给每一个属性添加上订阅者
            if(Dep.target){
                console.log(`订阅${key}`)
                dep.addSub(Dep.target)
            }
            return value
        },
        set: function(newValue){
            // 1. 监听到变化
            console.log(`监听到值的变化, ${key}: ${value} => ${newValue}`)
            value = newValue
            // 2. 通知所有订阅者
            dep.notify()
        }
    })
}


// 订阅器：收集订阅者  用来作为observe和watcher中间的过度
function Dep(){
    this.subs = []
}
Dep.prototype.addSub = function(sub){
    this.subs.push(sub)
}
Dep.prototype.notify = function(){
    this.subs.forEach(sub => {
        sub.update()
    })
}
//全局属性 通过它配置watcher
Dep.target = null


function Watcher(data, key, cb){
    this.data = data
    this.key = key
    this.cb = cb
    Dep.target = this
    console.log(Dep.target)
    // 这里会触发 defineReactive的get
    this.value = data[key]
    Dep.target = null
}
Watcher.prototype.update = function(){
    this.value = this.data[this.key]
    // 更新dom
    this.cb(this.value)
}

var person = {name: 'awefeng', xx: 'cxx', info: {age: 18}}

function updateDom(value){
    console.log(`更新成了新的值:${value}`)
}

observe(person)
new Watcher(person, 'name', updateDom)
person.name = 'awefengx2222'