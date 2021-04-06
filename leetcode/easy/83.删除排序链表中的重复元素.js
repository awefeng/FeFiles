/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


/*
const a = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3)))))
*/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    const cache = new Set()
    let pre =null, cur = head
    while(cur !== null){
        if(cache.has(cur.val)){
            if(cur.next){
                pre.next = cur.next
            }else{
                pre.next = null
            }
        }else{
            cache.add(cur.val)
            pre = cur
        }   
        cur = cur.next     
    }
    return head
};
// @lc code=end