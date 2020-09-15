/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let aNode = headA, bNode = headB
    while(aNode && bNode){
        if(aNode === bNode){
            return aNode
        }
        aNode = aNode.next
        bNode = bNode.next
    }
    return null
};