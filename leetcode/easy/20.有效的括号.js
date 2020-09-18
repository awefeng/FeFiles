/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [], cur = 0
    while(cur < s.length){
        switch(s[cur]){
            case '(':
            case '{':
            case '[':
                stack.push(s[cur])
                break
            case ')':
                if(stack.pop() !== '('){
                    return false
                }
                break
            case '}':
                if(stack.pop() !== '{'){
                    return false
                }
                break
            case ']':
                if(stack.pop() !== '['){
                    return false
                }
                break
            default:
                break
        }
        cur++
    }
    return stack.length === 0
};
// @lc code=end

