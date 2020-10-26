/*
 * @lc app=leetcode.cn id=1365 lang=javascript
 *
 * [1365] 有多少小于当前数字的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    let sortArr = [...nums].sort((a, b) => a-b)
    let newArr = [], index = 0
    while(index < nums.length){
        const find = sortArr.findIndex(item => item === nums[index])
        newArr.push(find)
        index++
    }
    return newArr
};

smallerNumbersThanCurrent([8,1,2,2,3])
// @lc code=end

