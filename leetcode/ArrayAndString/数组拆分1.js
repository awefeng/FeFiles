/**
 * @param {number[]} nums
 * @return {number}
 */
// 题目意思是找到最大的min集合
// 一个数组最大的min就是第二大的数字 按照这个思路递归 得出结论 最大的min集合其实就是排序后的 第 0 ，2 ，4， 6， 8... n-2
// 然后在双指针 减少n/2次遍历
var arrayPairSum = function(nums) {
    const newArr = nums.sort((a, b)=> a-b)
    let i=0;j=newArr.length-1;sum = 0
    while(i<=j-1){
        sum = sum + newArr[i] + newArr[j-1]
        if(i == j-1) sum = sum - newArr[i]
        i+=2
        j-=2
    }
    return sum
};

console.log(arrayPairSum([]))