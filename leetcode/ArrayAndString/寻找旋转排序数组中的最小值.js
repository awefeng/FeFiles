/**
 * @param {number[]} nums
 * @return {number}
*/
//1,经过排序且在某个点旋转后 旋转点后面的数组仍然比旋转后第一个元素小
var findMin = function(nums){
    if(nums.length === 1) return nums[0]
    let left = 0; let right = nums.length-1
    if(nums[right] > nums[left]) return nums[left]
    while(left <= right){
        const mid = Math.floor((right - left)/2) + left
        if(nums[mid] < nums[mid-1]) return nums[mid]
        if(nums[mid] > nums[mid+1]) return nums[mid+1]
        if(nums[mid] > nums[left]){
            left= mid
        }
        if(nums[mid] < nums[right]){
            right = mid
        }
    }
}
// 2 . 暴力遍历 o(n)
var findMin2 = function(nums) {
    if(nums.length ===1) return nums[0]
    if(nums.length ===2) return Math.min(nums[0], nums[1])
    for(let i =0; i<nums.length-2; i++){
        if(nums[i] > nums[i+1]) return nums[i+1]
    }
};

console.log(finMin([1, 2,3]))