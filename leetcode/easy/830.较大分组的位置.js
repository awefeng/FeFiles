/*
 * @lc app=leetcode.cn id=830 lang=javascript
 *
 * [830] 较大分组的位置
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function(s) {
    let start = 0, end = 1, result=[]
    while(end <= s.length){
        if(s[start] !== s[end]){
            if((end - start) >=3){
                result.push([start, end-1])
            }
            start = end   
        }
        end++
    }
    return result
};
// @lc code=end

console.log(largeGroupPositions('aaa'))