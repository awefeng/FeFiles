/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let arr = []
    s.toLocaleLowerCase().split('').forEach(item => {
      if(/[a-zA-Z0-9]/.test(item)){
        arr.push(item)
      }
    })
    let start = 0
    let end = arr.length - 1
    // 尾递归 此处尾递归浪费空间大 用双指针比较好
    //return s.charCodeAt(start) === s.charCodeAt(end) ? isPalindrome(s.substring(++start, --end)) : false
    while(start < end){
        if(arr[start] !== arr[end]) return false
        start++
        end--
    }
    return true
  };
// @lc code=end

console.log(isPalindrome("ab_a"))