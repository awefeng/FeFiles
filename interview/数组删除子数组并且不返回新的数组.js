if(!Array.prototype.spliceArr){
    Array.prototype.spliceArr = function (sonArr) {
        let fatherArr = this
        if(Array.isArray(fatherArr) && Array.isArray(sonArr)){
            // indexof 没查找到会返回-1
            let start = fatherArr.join('').indexOf(sonArr.join(''))
            //splice 负数的时候会从数组末尾开始 所以indexof返回-1的时候进行判断
            start >= 0 ? fatherArr.splice(start, sonArr.length) : undefined
        }else{
            throw new Error('参数错误')
        }
    }
}

let fatherArr = [1,2,1,3,4,5,6]
let sonArr = [1,2]

fatherArr.spliceArr(sonArr)
console.log(fatherArr)