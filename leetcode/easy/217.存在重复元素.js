/*
 * @lc app=leetcode.cn id=217 lang=javascript
 *
 * [217] 存在重复元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let cache = [], index = 0
    while(index < nums.length){
        if(cache[nums[index]]){
            return true
        }
        cache[nums[index]] = true
        index++
    }
    return false
};
// @lc code=end

console.log(containsDuplicate([0]))