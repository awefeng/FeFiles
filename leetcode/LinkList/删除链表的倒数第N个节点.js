/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// // 1. cache缓存 转换成数组
// /**
//  * @param {ListNode} head
//  * @param {number} n
//  * @return {ListNode}
//  */
// var removeNthFromEnd = function(head, n) {
//     let cur = head, cache =[]
//     while(cur){
//         cache.push(cur)
//         cur = cur.next
//     }
//     let pre = cache[cache.length -n-1]
//     let aft = cache[cache.length -n + 1]
//     if(pre){
//         pre.next = aft ? aft : null
//     }else{
//         return aft ? aft : null
//     }
//     return head
// };

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// 2 哑结点 双指针
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode()
    dummy.next = head
    let first = dummy, second = dummy
    let length = n
    while(length+1 > 0){
        first = first.next
        length--
    }
    while(first){
        second = second.next
        first = first.next
    }
    second.next = second.next.next
    return dummy.next
};