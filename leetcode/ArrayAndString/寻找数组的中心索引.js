/**
 * @param {number[]} nums
 * @return {number}
 */
// 左边值 右边值 动态
const pivotIndex = function(nums) {
  if(nums.length < 3){
    return -1
  }
  function calcTotal(arr, start, end){
    let result = 0
    for(let i = start; i<end; i++){
      result = result + arr[i]
    }
    return result
  }
  let index = -1
  let left = 0
  let right = calcTotal(nums, 1, nums.length)
  for(let i=0; i< nums.length; i++){
    if(left === right){
      return i
    }
    else{
      left = left + nums[i]
      right = right - nums[i+1]
    }
  }
  return index
}

console.log(pivotIndex([-1, -1, 0, 1, 1, 0]))