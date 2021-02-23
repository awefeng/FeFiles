/*
 * @lc app=leetcode.cn id=766 lang=javascript
 *
 * [766] 托普利茨矩阵
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function isEqual(arr1, arr2){
    if(arr1.length !== arr2.length) return false
    for(let i=0;i<arr2.length; i++){
        if(arr2[i] !== arr1[i]){
            return false
        }
    }
    return true
}

/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function(matrix) {
    for(let i = 0; i< matrix.length - 1;i++){
        const pre = matrix[i].slice(0, matrix[i].length -1)
        const pro = matrix[i+1].slice(1, matrix[i+1].length)
        if(!isEqual(pre, pro)){
            return false
        }
    }
    return true
};
// @lc code=end

console.log(isToeplitzMatrix([[1,2,3,4],[5,1,2,3],[9,5,1,2]]))