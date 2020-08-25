/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 二分
var searchInsert = function(nums, target) {
  let left = 0, right=nums.length-1, res = nums.length
  while(left <= right){
    let mid = ((right - left) >> 1) + left
    if(target <= nums[mid]){
      res = mid
      right = mid-1
    }else{
      left = mid+1
    }
  }
  return res
}

// 普通
/**
var searchInsert = function(nums, target) {
  for(let i=0;i<nums.length;i++){
    if(target <= nums[i] ){
      return i
    }
  }
  return nums.length
}
 */