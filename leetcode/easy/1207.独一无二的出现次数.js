/*
 * @lc app=leetcode.cn id=1207 lang=javascript
 *
 * [1207] 独一无二的出现次数
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let map = new Map(), index = 0
    while(index < arr.length){
        if(map.has(arr[index])){
            map.set(arr[index], map.get(arr[index]) + 1)
        }else{
            map.set(arr[index], 1)
        }
        index++
    }
    let set = new Set(map.values())
    return set.size === map.size
};
// @lc code=end

uniqueOccurrences([1,2,2,1,1,3])