/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let map = new Map()
    for(let i =0;i<s.length;i++){
        if(map.has(s[i])){
            let temp = map.get(s[i]) + 1
            map.set(s[i] , temp)
        }else{
            map.set(s[i], 1)
        }
    }
    for(let j=0;j<t.length;j++){
        if(map.has(t[j])){
            let temp = map.get(t[j])- 1
            if(temp < 0){
                return false
            }
            map.set(t[j], temp)
        }else{
            return false
        }
    }
    for(let times of map.values()){
        if(times) return false
    }
    return true
};
// @lc code=end

console.log(isAnagram('ab', 'a'))

