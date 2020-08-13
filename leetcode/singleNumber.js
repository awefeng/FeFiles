/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  return nums.find((num, index) => nums.findIndex((_num, _index) =>num === _num && index !==_index ) === -1)
};