/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 先上下对折 再从左上角到右下角对折
var rotate = function(matrix) {
    let slow = 0, fast = matrix.length -1
    while(slow < fast){
        [matrix[slow], matrix[fast]] = [matrix[fast], matrix[slow]] 
        slow++
        fast--
    }
    let index = 0
    while(index < matrix.length){
        for(let x =0;x<=index;x++){
            for(let y=0;y<index;y++){
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]
            }
        }
        index++
    }
};
// @lc code=end

