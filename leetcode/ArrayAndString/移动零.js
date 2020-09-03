/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 移动0到数组末尾并且保持非0的顺序，即移动非0的到前面
var moveZeroes = function(nums) {
    let slow = 0,fast = 0, len = nums.length
    while(fast < len){
        if(nums[fast]!==0){
            let temp = nums[fast]
            nums[fast] = 0
            nums[slow] = temp
            slow++
        }
        fast++
    }
};
let nums = [1,2,0,3,0,5]

moveZeroes(nums)
console.log(JSON.stringify(nums))