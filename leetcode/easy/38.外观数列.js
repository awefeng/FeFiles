/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 */

// @lc code=start
/**
 * @param {number} n
 * @param {string} str
 * @return {string}
 */
function toSay(str){
    let start = 0, end = 0,result = ''
    while(end <= str.length){
        if(str.charAt(start) !== str.charAt(end)){
            result = result + `${end - start}${str.charAt(start)}`
            start = end
        }
        end++
    }
    //result = result + `${str.length - start}${str.charAt(start)}`
    return result
}
// 递归
var countAndSay = function(n) {
    
    if(n ===1) return "1"
    return toSay(countAndSay(n-1))
};
// @lc code=end

console.log(countAndSay(5))
