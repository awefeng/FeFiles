/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let res = str.trim().match(/^(\-|\+)?\d+/g)
    return res ? Math.max(Math.min(Number(res[0]),2**31-1),-(2**31)) : 0
};
// @lc code=end

