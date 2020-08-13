/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let set = new Set(nums)
  Array.from(set).forEach((value, index) => {
    console.log(value, index)
    nums[index] = value
  })
  return set.size
};

const nums = [1,'x','x', 'xx','as','xx',5,5,123,1,2,3]

const len = removeDuplicates(nums)
console.log(len)
console.log(nums)