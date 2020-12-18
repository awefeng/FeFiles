// 手写 call函数
Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

// 手写实现apply方法
Function.prototype.myApply = function (context){
  if(typeof this !== 'function'){
    throw new Error('error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments][1]
  const result = context.fn(...args)
  delete context.fn
  return result
}

// 手写 bind函数，用call实现，bind函数是返回的一个函数
Function.prototype.bind = Function.prototype.bind || function(context){
  if(typeof this !== 'function'){
      throw new Error('调用者不是函数')
  }
  let _this = this
  let args = Array.from(arguments).slice(1)
  let func = function(){}
  let fbind = function(){
      let newArgs = [...arguments]
      return _this.apply(this instanceof func ? this : context, args.concat(newArgs))
  }
  func.prototype = _this.prototype
  fbind.prototype = new func()
  return fbind
}

Function.prototype.bind = Function.prototype.bind || function(context){
  //省略边界处理
  let _this = this
  let args = [...arguments].slice(1)
  let func = function(){}
  let fbind = function(){
    let newArgs = [...arguments]
    return _this.apply(this instanceof func ? this : context, args.concat(newArgs))
  }
  func.prototype = _this.prototype
  fbind.prototype = new func()
  return fbind
}