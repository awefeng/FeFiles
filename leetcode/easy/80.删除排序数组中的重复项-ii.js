/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除排序数组中的重复项 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let cur = 1; tag = 0
    while(cur < nums.length){
        if(nums[cur]!==nums[tag]){
            tag = cur
            cur++
            continue
        }
        if(cur - tag > 1){
            nums.splice(cur, 1)
        }else{
            cur++
        }

    }
    return nums.length
};
// @lc code=end

removeDuplicates([1,1,1,2,2,3])