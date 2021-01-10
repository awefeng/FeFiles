/**
 * 基本类型 引用类型
 */
typeof 123 // number
typeof '123' // string
typeof false // boolean
typeof undefined // undefined
typeof null // object 历史原因，最后开始没考虑设计null这种类型，只是把它当作object的特殊值，后面单独作为类型后，为了兼容原来的代码，还是让typeof null = object

function func1(){}
typeof func1 // function

let v
var w
typeof v // undefined
typeof w // undefined

typeof {} // object
typeof [] // object
// typeof不能区分引用类型的具体类型

typeof 2 === typeof(2) // typeof可以写成函数式，推荐写成函数式，JS在提倡消除delete typeof等命令式的用法



/**
 * null undefined
 */

 // null表示空、没有，undefined表示未定义
undefined == null // true
if(undefined == null){console.log('undefined == null is true')}

// null可以自动转换为0 为了和C语言保持一致~ 
Number(null) // 0
null == 0 // false // == 这个等式的算法太复杂了 这个记住先
null === 0 // false
5 + null // 5

null > 0 // false
null < 0 // false
null >= 0 // true
null <= 0 // true

Number(undefined) == NaN // true
undefined > 0 // false
undefined < 0 // false
undefined == 0 // false
undefined >= 0 // false
undefined <= 0 // false


/**
 * Boolean类型
 */

// 以下6种都会自动转换为false 其余的都会转为true 对象一律返回true
'' == false
"" == false
0 == false
NaN == false
undefined == false
null == false

Boolean([]) == true // true
Boolean({}) == true // true

Boolean() == false // true


/**
 * 数值
 */

// JS存储数值都是以浮点形式存储的
1 === 1.0 // true
0.1 + 0.2 === 0.3 // false
0.1 + 0.7 === 0.8 // false

// 但是 
0.1 + 0.3 === 0.4 // true  因为0.1和0.3浮点运算以后约等于0.40000000000000000 JS把多余的0去掉了 就等于0.4了

// 总之 做小数运算的时候 多注意 保重身体

NaN  // not a number 数值运算不能得出数值的时候就会返回NaN

5 - 'x'  === NaN   // true

Infinity // 正无穷
-Infinity // 负无穷

typeof NaN === 'number' // true
typeof Infinity === 'number' // true

// 关于数值的全局方法
parseInt('200000', 3) // 第二个参数是几进制的意思 范围是2-36

[1,1,1,1,1].map(parseInt) //[1, NaN, 1,1,1]

parseFloat('3.12')

isNaN(NaN) // true

NaN == NaN // false
Object.is(NaN, NaN)



/**
 * string
 */

'\'xxx\'' // 'xxx'

// 字符串无法操作长度或着单个字符的改变来改变字符串 因为是基本类型
let str1 = 'hello'
str1.length = 3
str1.length // 5

delete str1[2]
str1[1] = 'x'
str1 // hello

//Base64 
//有些符号文本不可打印，就用base64转换成0-9 a-z A-Z + \组成的字符串
//使用base64不是为了加密 是为了不出现特殊字符，简化程序的处理

btoa('xxx')  //转换为base64
atob('SGVsbG8gV29ybGQh') //base 转换回来


/**
 * object
 */

let awefeng = {name: 'awefeng', age: 18}
Object.keys(awefeng) // ['name', 'age']

delete age 

'name' in awefeng // true  in运算符判断某对象有没有这个属性 但是in也会查找继承的属性
'toString' in awefeng // true

for (let key in awefeng){
    awefeng.hasOwnProperty(key) && console.log(awefeng[key])
}
// for in 会遍历到继承的可遍历的属性 所以一般都加上 hasOwnProperty
