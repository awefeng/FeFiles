/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// 双指针 指向头尾 和大了就尾部往前移动 和小了就头部往前移动
var twoSum = function(numbers, target) {
    let start =0;end = numbers.length- 1
    while(start < end){
        if(numbers[start] + numbers[end] === target){
            return [start+1, end+1]
        }
        if(numbers[start] + numbers[end] > target){
            end--
        }
        if(numbers[start]+ numbers[end] < target){
            start++
        }
    }
    return []
};

console.log( twoSum([2,7,11,15], 9))