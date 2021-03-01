/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.nums = nums
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    const arr = this.nums
    let result = 0
    for(let start = i;start<= j;start++){
        result  = result + arr[start]
    }
    return result
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end

const arr = new NumArray([-2,0,3,-5,2,-1])

arr.sumRange(0,2)
