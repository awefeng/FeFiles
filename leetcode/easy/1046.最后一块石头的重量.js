/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    if(stones.length === 0){
        return 0
    }
    if(stones.length === 1){
        return stones[0]
    }
    const s= stones.sort((a, b)=> a-b)
    const temp = s.pop() - s.pop()
    if(temp){
        s.push(temp)
    }
    return lastStoneWeight(s)
};
// @lc code=end


console.log(lastStoneWeight([8, 10, 4]))