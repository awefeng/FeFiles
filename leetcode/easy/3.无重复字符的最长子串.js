/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let answer = 0;
    let start = 0;
    for (let end = 0; end < s.length; end++) {
        let position = s.indexOf(s[end], start);
        if (position < end) {
            // start 和 end 之间有重复字符
            start = position + 1;
        }
        answer = Math.max((end - start + 1), answer);
    }
    return answer;
};

console.log(lengthOfLongestSubstring('abcda'))
// @lc code=end

