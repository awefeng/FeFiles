/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function reverseList(start, end){
    let pre = null, cur = start, nxt = end
    // while 终止的条件改一下就行了
    while (cur != end) {
        nxt = cur.next
        cur.next = pre
        pre = cur
        cur = nxt
    }
    // 返回反转后的头结点
    return pre;
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    if(head === null) return head
    let start = head, end = head
    for(let i=0;i<k;i++){
        // 不足的时候 返回剩下的
        if(end === null) return start
        end = end.next
    }
    let newHead = reverseList(start, end)
    start.next = reverseKGroup(end, k)
    return newHead
};
// @lc code=end

