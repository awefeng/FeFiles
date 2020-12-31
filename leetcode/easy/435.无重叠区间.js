/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if(intervals.length ===0) return 0
    const newI = intervals.sort((a,b) => a[1] - b[1])
    let count = 1, currentI = newI[0]
    for(let i=1;i<intervals.length;i++){
        if(newI[i][0] >= currentI[1]){
            currentI = newI[i]
            count++
        }
    }
    return intervals.length - count
};
// @lc code=end

console.log(eraseOverlapIntervals([ [1,2], [2,3], [3,4], [1,3] ]))
