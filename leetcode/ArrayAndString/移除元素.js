/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
//典型的快慢双指针
var removeElement = function(nums, val) {
    let slow =0
    for(let fast=0;fast<nums.length;fast++){
        if(nums[fast]!==val){
            nums[slow] = nums[fast]
            slow++
        }
    }
    return slow
};
let arr = [3,2,2,3]
console.log(removeElement(arr,3))
console.log(arr)