/**
 * @param {number[]} nums
 * @return {number}
 */
//https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/
// 删除数组中的重复项 并返回新的数组长度
var removeDuplicates = function(nums) {
    let slow = 0, fast = 1
    while(fast < nums.length){
        if(nums[slow] !== nums[fast]){
            slow++
            nums[slow] = nums[fast]
        }
        fast++
    }
    return slow + 1
};