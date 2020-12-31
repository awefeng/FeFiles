/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(nums.length === 0) return 0
    let pre =0 , sum=nums[0]
    nums.forEach(item => {
        if(pre > 0){
            pre = pre+item 
        }else{
            pre = item
        }
        sum = Math.max(pre, sum)
    })
    return sum
};
// @lc code=end

