// 通过在缓存函数里存储一个闭包 来达到以前执行过 只需要读取
const memorize = function(fn) {
    const cache = {}
    return function(...args) {
      const _args = JSON.stringify(args)
      return cache[_args] || (cache[_args] = fn.apply(fn, args))
    }
  } 