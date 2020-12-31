/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @param {TreeNode} root
 * @return {boolean}
 */
const treeCheck = function(left, right){
    if(left === null && right === null){
        return true
    }
    if(left === null || right === null){
        return false
    }
    if(left.val !==right.val){

        return false
    }
    return treeCheck(left.left, right.right) && treeCheck(left.right, right.left)

}
var isSymmetric = function(root) {
    return treeCheck(root, root)
};
// @lc code=end

