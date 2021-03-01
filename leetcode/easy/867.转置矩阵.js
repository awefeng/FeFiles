/*
 * @lc app=leetcode.cn id=867 lang=javascript
 *
 * [867] 转置矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
    let result = new Array(matrix[0].length)
    for(let i =0;i< result.length;i++){
        result[i] = []
    }
    for(let i = 0; i< matrix.length; i++){
        for(let j =0;j< matrix[i].length;j++){
            result[j][i] = matrix[i][j]
        }
    }
    return result
};
// @lc code=end

