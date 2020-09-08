/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

function TreeNode(val){
    this.val = val
    this.left = null
    this.right = null
}
let root = new TreeNode(1)
root.right = new TreeNode(2)
root.right.left = new TreeNode(3)

// 后序遍历 左右根

// //2. 递归
// var postorderTraversal = function(root) {
//     let result = []
//     if(!root)return result
//     if(root.left){
//         result.push(...postorderTraversal(root.left))
//     }
//     if(root.right){
//         result.push(...postorderTraversal(root.right))
//     }
//     result.push(root.val)
//     return result
// };
console.log(JSON.stringify(postorderTraversal(root)))