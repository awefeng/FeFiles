/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    if(nums.length === 0) return null
    const max = Math.max(...nums)
    const maxIndex = nums.findIndex(item => item === max)
    const root = {val: max, left: null, right: null}
    root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex))
    root.right = constructMaximumBinaryTree(nums.slice(maxIndex+1, nums.length))
    return root
};
// @lc code=end

console.log(constructMaximumBinaryTree([3,2,1,6,0,5]))