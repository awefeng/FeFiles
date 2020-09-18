/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
// 不转成数组 取余然后赋给一个新数
// 当新数大于等于剩下的数字的时候 就遍历过半了 结束
// 但是得判断0结尾的情况 
var isPalindrome = function(x) {
    if(x < 0 || (x%10===0 && x!==0)){
        return false
    }
    let revertNumber = 0
    while(x > revertNumber){
        revertNumber = revertNumber*10 + x%10
        x = x/10 | 0
    }
    return x === revertNumber || x === (revertNumber/10 | 0)
}
/* cache数组 取每一位存入 然后判断
var isPalindrome = function(x) {
    if(x < 0){
        return false
    }
    let cache = []
    while(x){
        cache.push(x%10)
        x = x/10 | 0
    }
    let start = 0, end = cache.length - 1
    while(start <= end){
        if(cache[start] !== cache[end]){
            return false
        }
        start++
        end--
    }
    return true
}
*/
// 字符串
// var isPalindrome = function(x) {
//     const arr = Number(x).toString().split("")
//     const revertArr = [...arr].reverse()
//     let i = 0, check = arr.length /2
//     while(i < check){
//         if(arr[i]!== revertArr[i]){
//             return false
//         }
//         i++
//     }
//     return true
// };
// @lc code=end

console.log(isPalindrome(121))