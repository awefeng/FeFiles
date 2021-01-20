const cloneDeep = require('./cloneDeep')

const a = {
  str: 'this is string',
  num: 2,
  bool: true,
  nul: null,
  unde: undefined,
  symbol: Symbol('mark'),
  obj: {name: 'objName', desc: {title: 'obj desc'}},
  arr: ['so', 'stupid', {money: 575134}, [2,1]],
  func: function(name){
    console.log(name)
  },
  date: new Date(),
  reg: new RegExp('/一个正则/ig'),
  err: new Error('一个错误'),
}
// a.loop = a // 环

// 序列化与反序列化
// const b = cloneDeepByFlatten(a)
// 浅拷贝+ 递归
const b = cloneDeep.cloneDeepByRecursion(a)
// lodash cloneDeep
// const b = _.cloneDeep(a)

a.obj.name = 'a modify'
a.arr[3][1] = 'money'

console.log(a)
console.log(b)

// let aSymbol = a.symbol
// let tempSymbol = Symbol('mark')
// console.log(a.symbol === aSymbol) // true
// console.log(a.symbol === tempSymbol) // false
console.log(a.symbol === b.symbol) // ? why true: symbol值的特殊