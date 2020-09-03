/**
 * @param {number[]} nums
 * @return {number}
 */
// 注意数组是排序后的
var removeDuplicates = function(nums) {
    let slow=0
    for(let fast = 1; fast<nums.length;fast++){
        if(nums[fast]!==nums[slow]){
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}

let nums = [0,0,1,1,1,2,2,3,3,4,4,4]

console.log(removeDuplicates(nums))

console.log(JSON.stringify(nums))