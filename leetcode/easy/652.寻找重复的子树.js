/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
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
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    const count = new Map()
    const ans = []

    const collect = (node) => {
        if (!node) {
            return '#'
        }
        const key = node.val + ',' + collect(node.left) + collect(node.right)
        if (count.has(key)) {
            count.set(key, count.get(key) + 1)
        } else {
            count.set(key, 1)
        }
        if (count.get(key) === 2) {
            ans.push(node)
        }
        return key
    }

    collect(root)
    return ans
 }

// @lc code=end

