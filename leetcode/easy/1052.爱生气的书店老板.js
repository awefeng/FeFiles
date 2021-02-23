/*
 * @lc app=leetcode.cn id=1052 lang=javascript
 *
 * [1052] 爱生气的书店老板
 */

// @lc code=start
function calcR(cus, grumpy, index){
    if(index === undefined) {return cus.reduce((a, b)=> a+b)}
    let result = 0
    for(let i = 0; i<cus.length; i++){
        if(grumpy[index+i] === 0){
            result += cus[i]
        }
    }
    return result
}
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */


var maxSatisfied2 = function(customers, grumpy, X) {
    let result = 0
    let start = 0
    while(start <= (customers.length - X)){
        let pre = calcR(customers.slice(0, start),grumpy, 0)
        let mid = calcR(customers.slice(start, start + X),grumpy, undefined)
        let pro = calcR(customers.slice(start + X, customers.length),grumpy,start+X)
        result = Math.max(pre + mid + pro, result)
        start++
    }
    return result
};

console.log(maxSatisfied([4, 10, 10], [1, 1, 0], 2))
// @lc code=end

