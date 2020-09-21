/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 多种方法 hash表缓存然后删除 就找到了
// 官方题解
// 异或运算 
var singleNumber = function(nums) {
    let ans = 0
    for(let i =0;i<nums.length;i++){
        ans = ans ^ nums[i]
    }
    return ans
};
// @lc code=end

