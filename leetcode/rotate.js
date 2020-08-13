/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const deleteNums = nums.splice(nums.length - k % nums.length)
  nums.unshift(...deleteNums)
};

const arr =[1,2,3,4,5,6,7]

rotate(arr, 3)

console.log(arr)