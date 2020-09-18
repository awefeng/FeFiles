/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let cur = 0, total = 0
    while(cur < s.length){
        if(s[cur] === "I"){
            if(s[cur+1] && s[cur+1] === "V"){
                total = total+4
                cur = cur + 2
            }else if(s[cur+1] && s[cur+1] === "X"){
                total = total + 9
                cur = cur + 2
            }else{
                total = total + 1
                cur = cur + 1
            }
            continue
        }
        if(s[cur] === "X"){
            if(s[cur+1] && s[cur+1] === "L"){
                total = total+40
                cur = cur + 2
            }else if(s[cur+1] && s[cur+1] === "C"){
                total = total + 90
                cur = cur + 2
            }else{
                total = total + 10
                cur = cur + 1
            }
            continue
        }
        if(s[cur] === "C"){
            if(s[cur+1] && s[cur+1] === "D"){
                total = total+400
                cur = cur + 2
            }else if(s[cur+1] && s[cur+1] === "M"){
                total = total + 900
                cur = cur + 2
            }else{
                total = total + 100
                cur = cur + 1
            }
            continue
        }
        switch(s[cur]){
            case 'V':
                total = total + 5
                break
            case 'L':
                total = total + 50
                break
            case 'D':
                total = total + 500
                break
            case 'M':
                total = total + 1000
            default:
                break
        }
        cur = cur + 1
    }
    return total
};
// @lc code=end

console.log(romanToInt("III"))