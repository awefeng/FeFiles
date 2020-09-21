/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    if(digits.length === 0) return [1]
    let last = digits.pop() + 1
    if(last < 10){
        return [...digits, last]
    }else{
        return [...plusOne(digits), 0]
    }
};
// @lc code=end

console.log(plusOne([9, 9, 9]))