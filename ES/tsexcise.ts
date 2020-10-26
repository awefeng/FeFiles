// 这样写会报错 原因是声明const后必须进行赋值，一旦赋值后，类型推断就会推断出这个常量的类型为’xxx‘，声明常量后面不需要加类型
// const str: string = 'xxx'

// const str: () => string = () => "xxx"

interface User{
    name: string
    id: string
}

const stu1: User = {
    name: 'stuone',
    id: '34243fdsfghrtg34543'
}
console.log(stu1.name)
//类型推断 推断出a为number类型
let a = 1
console.log(typeof a)

// 类型收敛 因为是常量 不可更改 所以已经确认了b为类型为： 值为1的类型
const b = 1
type bt = typeof b
