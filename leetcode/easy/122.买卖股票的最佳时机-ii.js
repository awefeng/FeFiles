/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let cur = 0, total = 0
    while(cur < prices.length - 1){
       if(prices[cur] < prices[cur+1]){
           total = total + prices[cur+1] - prices[cur]
       }
       cur++
    }
    return total
};
// @lc code=end

