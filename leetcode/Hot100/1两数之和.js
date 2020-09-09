/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const arr = []
    for(let i=0;i<nums.length;i++){
        if(arr[target - nums[i]] !== undefined){
            return [arr[target - nums[i]], i]
        }else{
            arr[nums[i]] = i
        }
    }
    return []
};
console.log(JSON.stringify(twoSum([2, 7, 9,11], 9)))