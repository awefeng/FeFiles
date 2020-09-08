/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}

let root = new TreeNode(3)
root.left = new TreeNode(9)
root.right = new TreeNode(20)
root.right.left = new TreeNode(15)
root.right.right = new TreeNode(7)
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// bfs 广度优先搜索
var levelOrder = function(root) {
    let queue = [],result = [], node = {root: root, index: 0}
    if(!root){return result}
    queue.push(node)
    while(node){
        node.root.left && queue.push({root: node.root.left, index: node.index+1})
        node.root.right && queue.push({root: node.root.right, index: node.index+1})
        node = queue.shift()
        if(!result[node.index]){
            result[node.index] = []
        }
        result[node.index].push(node.root.val)
        node = queue[0]
    }
    return result
}

console.log(JSON.stringify(levelOrder(root)))