/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 缺失数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 1 数学方法
// var missingNumber = function(nums) {
//     let n = nums.length
//     let sum = n * (n+1)/2
//     for(let i=0;i< nums.length;i++){
//         sum = sum - nums[i]
//     }
//     return sum
// };

// 2 异或运算 本身与本身异或为0  数组 和 0-n 异或以后就为缺失的那个
var missingNumber = function(nums) {
    let result = nums.length
    for(let i=0;i<nums.length;i++){
        result ^= nums[i] ^ i
    }
    return result
}
// @lc code=end

