/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let start = -1,total=0
    for(let index=0;index<=nums.length;index++){
        if(nums[index]!==1){
            total = Math.max(index - start -1, total)
            start = index
        }
    }
    return total
};

console.log(findMaxConsecutiveOnes([1,1,0,0,1,1,1]))