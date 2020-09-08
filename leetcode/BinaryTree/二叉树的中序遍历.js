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
// 中序遍历 左根右
//2. 栈 迭代
var inorderTraversal = function(root){
    let stack = [], result = [], cur = root
    while(stack.length || cur){
        // 先把左边的遍历完成以后再去处理每一个左节点的右边 右边处理完成以后 直接左边网上跳一级
        while(cur){
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        result.push(cur.val)
        cur = cur.right
    }
    return result
}

// //1. 递归
// var inorderTraversal = function(root) {
//     let result = []
//     if(!root)return result
//     if(root.left){
//         result.push(...inorderTraversal(root.left))
//     }
//     result.push(root.val)
//     if(root.right){
//         result.push(...inorderTraversal(root.right))
//     }
//     return result
// };