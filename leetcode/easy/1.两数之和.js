/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let cache = [], index = 0
    while(index < nums.length){
        if(cache[target -  nums[index]] !== undefined){
            return [cache[target-nums[index]], index]
        }else{
            cache[nums[index]] = index
        }
        index++
    }
    return []
};
// @lc code=end

console.log(twoSum([2, 7,11,15], 9))

