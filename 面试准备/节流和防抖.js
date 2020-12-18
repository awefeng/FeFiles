// 防抖
function debounce(func, times=1000){
    let start = new Date()
    let _this = this
    return function(){
        let _args = arguments
        let now = +new Date()
        if(now - start > times){
            func.call(_this, _args)
        }
        // 防抖是每一次都需要重新计时
        start = now
    }
}

// 节流
function throttle(func, times=1000){
    let previous = 0
    let _this = this
    return function(){
        let _args = arguments
        let now = +new Date()
        //一个周期
        if(now - previous > times){
            // 节流是每个周期只执行一次
            previous = now
            func.call(_this, _args)
        }
    }
}

setInterval(debounce(function(){
    console.log('hello')
}, 1000), 2000)

// setInterval(throttle(function(){
//     console.log('hello')
// }, 2000), 1000)
// 防抖
function debounce(func, times = 1000){
    let _this = this
    let start = new Date().getTime()
    return function(){
        let now = new Date().getTime()
        let _args = [...arguments]
        if(now - start >= times){
            func.call(_this, _args)
        }
        start = now
    }
}

function throttle(func, times = 1000){
    let _this = this
    let previous = 0
    return function(){
        let now = new Date().getTime()
        let _args = [...arguments]
        if(now - previous >= times){
            // 执行后重新计时
            previous = now
            func.call(_this, _args)
        }
    }
}