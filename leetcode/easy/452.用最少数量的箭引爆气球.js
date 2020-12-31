/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if(points.length === 0) return 0
    const newP = points.sort((a, b) => a[1] - b[1])
    let count=1, current = newP[0]
    for(let i=1;i<points.length;i++){
        if(newP[i][0] > current[1]){
            count++
            current = newP[i]
        }
    }
    return count
};
// @lc code=end

