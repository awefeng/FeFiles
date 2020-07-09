const _ = require('./lodash')
const {cloneDeepByRecursion, cloneDeepByFlatten} = require('./cloneDeep')
const ranges = [7, 4]

const arr = new Array(ranges[0]).fill(new Array(ranges[1]).fill(''))

// 第一个是以fill里面填入的是 新创建的引用类型，则引用类型只新建了一次，然后每次传入的都是同一个引用
// 切勿想当然
//  arr[1][1] = 2
//  console.log(arr)



// 第二个是lodash的深拷贝特性，保持了上面的“数组每一个元素都指向了第二个fill生成的引用对象”这个特性
const temp = _.cloneDeep(arr)
// 序列化和我们本身的实现不会
// const temp = cloneDeepByFlatten(arr)
// const temp = cloneDeepByRecursion(arr)
temp[1][1] = 2

console.log(temp)

// console.log(_.isObject(Symbol())) // false
