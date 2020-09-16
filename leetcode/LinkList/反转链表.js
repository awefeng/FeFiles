/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let newHead = head
    while(head && head.next){
        let temp = head.next
        head.next = head.next.next   
        temp.next = newHead
        newHead = temp          
    }
    return newHead
};
