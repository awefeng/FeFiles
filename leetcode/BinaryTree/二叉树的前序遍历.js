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

 //2. 迭代 栈
 var preorderTraversal = function(root){
    let stack = [], result = []
    if(root) stack.push(root)
    while(stack.length){
        root = stack.pop()
        result.push(root.val)
        if(root.right) stack.push(root.right)
        if(root.left) stack.push(root.left)
    }
    return result
 }


// //1. 递归
// var preorderTraversal = function(root) {
//     let result = []
//     if(!root)return result
//     result.push(root.val)
//     if(root.left){
//         result.push(...preorderTraversal(root.left))
//     }
//     if(root.right){
//         result.push(...preorderTraversal(root.right))
//     }
//     return result
// };


console.log(JSON.stringify(preorderTraversal(root)))