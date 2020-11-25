/*
 * @lc app=leetcode.cn id=1370 lang=javascript
 *
 * [1370] 上升下降字符串
 */

// @lc code=start
/*
1. 遍历排序 蠢方法
var sortString = function(s) {
    if(!s) return ''
    let result1 = []
    let result2 = []
    const arr = s.split("").sort()
    for(let i = 0; i< arr.length; i++){
        if(!result1.includes(arr[i])){
            result1.push(arr[i])
            arr[i] = undefined
        }
    }
    for(let j = arr.length -1; j>=0; j--){
        if(arr[j]!== undefined && !result2.includes(arr[j])){
            result2.push(arr[j])
            arr[j] = undefined
        }
    }
    const restStr = arr.filter(item => item !== undefined).join("")
    return [...result1, ...result2].join('') + sortString(restStr)
};
*/
/**
 * @param {string} s
 * @return {string}
 */
//2. 桶 
var sortString = function(s) {
    let tong = new Array(26).fill(0)
    let arr = s.split('')
    // 填桶 a的ascii码是97
    for(let i =0 ;i< s.length;i++){
        tong[s.charCodeAt(i) - 97]++ 
    }
    let result = []; let tag = true
    while(result.length < s.length){
        // tag = true则是从左往右遍历
        if(tag){
            for(let i =0;i<tong.length;i++){
                if(tong[i] !== 0){
                    result.push(String.fromCharCode(97 + i))
                    tong[i]--
                }
            }
        }else{
            for(let i =tong.length -1;i>=0;i--){
                if(tong[i] !== 0){
                    result.push(String.fromCharCode(97 + i))
                    tong[i]--
                }
            }
        }
        tag = !tag
    }
    return result.join('')
}
// @lc code=end

console.log(sortString('leetcode'))