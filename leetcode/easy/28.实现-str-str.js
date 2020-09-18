/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 固定长度比较
var strStr = function(haystack, needle) {
    let start = 0, end = start + needle.length
    while(end <= haystack.length){
        if(haystack.substring(start, end) === needle){
            return start
        }
        start++
        end++
    }
    return -1
}
/* 双指针 滑动窗口 来比较 可以优化
var strStr = function(haystack, needle) {
    let start =0,end = 0
    while(end <= haystack.length){
        // 找出start - end 这段子串
        const curStr = haystack.substring(start, end)
        // 如果needle是这个开头 
        if(needle.startsWith(curStr)){
            // 如果长度相等 就找到了 返回start
            if(end - start === needle.length){
                return start
            }
        }else{
        // 如果needle不是这个开头 则要把start向前移动一位 并且end不能再加
            start++
            continue
        }
        end++
    }
    return -1
};
*/
// @lc code=end

console.log(strStr("mississippi", 'issip'))