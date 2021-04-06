/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let rowIndex = -1
    for(let i =0; i< matrix.length; i++){
        if(target === matrix[i][matrix[i].length -1]){
            return true
        }
        if(target < matrix[i][matrix[i].length -1]){
            rowIndex = i
            break
        }
    }
    if(rowIndex > -1){
        for(let i=0;i<matrix[rowIndex].length;i++){
            if(matrix[rowIndex][i] === target){
                return true
            }
            if(matrix[rowIndex][i] > target){
                return false
            }
        }
    }
    return false
};
// @lc code=end


console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 30))