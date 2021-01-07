/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(inorder.length === 0) return null
    const root = {val: null, left: null, right: null}
    root.val = preorder.shift()
    const leftIndex = inorder.findIndex(item => item === root.val)
    const left = inorder.slice(0, leftIndex)
    const right = inorder.slice(leftIndex+1)
    root.left = buildTree(preorder, left)
    root.right = buildTree(preorder, right)
    return root
};
// @lc code=end

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7] ))