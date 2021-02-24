/*
 * @lc app=leetcode.cn id=832 lang=javascript
 *
 * [832] 翻转图像
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
    A.forEach(item => item.reverse())
    A.forEach(item => {
        for(let i=0;i< item.length;i++){
            item[i] = Math.abs(1 - item[i])
        }
    })
    return A
};  
// @lc code=end

flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]])