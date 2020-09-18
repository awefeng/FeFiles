/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 迭代
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2
    if(l2 === null) return l1
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    }else{
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}

/* 通过移动进行计算的
var mergeTwoLists = function(l1, l2) {
    let cur1 = l1,cur2 = l2
    let dummy = new ListNode()
    let resultCur = dummy
    while(cur1 && cur2){
        if(cur1.val > cur2.val){
            resultCur.next = cur2
            cur2 = cur2.next
        }else{
            resultCur.next = cur1
            cur1 = cur1.next
        }
        resultCur = resultCur.next
    }
    if(cur1){
        resultCur.next = cur1
    }
    if(cur2){
        resultCur.next = cur2
    }
    return dummy.next
};
*/
// @lc code=end

