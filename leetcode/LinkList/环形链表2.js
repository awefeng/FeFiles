// https://leetcode-cn.com/leetbook/read/linked-list/jjhf6/

// 通过值判断 这种解决办法只适用于链表的值不同
// /**
//  * @param {ListNode} head
//  * @return {ListNode}
//  */
// var detectCycle = function(head) {
//     let cacheNodeList = [], cur = head
//     while(cur){
//         // 通过索引O(1) 来解决includes之流
//         if(cacheNodeList[cur.val]){
//             return cur
//         }
//         cacheNodeList[cur.val] = cur
//         cur = cur.next
//     }
//     return null
// };

// 通过索引判断
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let cacheNodeList = [], cur = head
    while(cur){
        if(cacheNodeList.includes(cur)){
            return cur
        }
        cacheNodeList.push(cur)
        cur = cur.next
    }
    return null
};