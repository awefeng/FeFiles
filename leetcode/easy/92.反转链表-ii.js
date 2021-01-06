/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
let notReverseHead = null
function reverseN(head, m){
    if(m === 1){
        notReverseHead = head.next
        return head
    }
    const last = reverseN(head.next, m -1)
    head.next.next = head
    head.next = notReverseHead
    return last 
}

var reverseBetween = function(head, m, n) {
    if(m === 1){
        return reverseN(head, n)
    }else{
        head.next = reverseBetween(head.next, m-1, n-1)
    }
    return head
};
// @lc code=end

