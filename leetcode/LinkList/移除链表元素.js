/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let dummy = new ListNode()
    dummy.next = head
    let cur = head, pre = dummy
    while(cur){
        if(cur.val === val){
            pre.next = cur.next
        }else{
            pre = cur 
        }
        cur = cur.next
    }
    return dummy.next
};