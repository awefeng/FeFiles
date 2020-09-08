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
var isSymmetric = function(root) {
    let stack = [], result = true, index = 0
    if(!root) return result
    while(result){
        stack.push(root.left)
        stack.push(root.right)
    }
};
