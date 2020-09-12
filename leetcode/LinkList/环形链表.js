//https://leetcode-cn.com/leetbook/read/linked-list/jbex5/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
         this.val = val;
         this.next = null;
     }

let head = new ListNode(3)
let second = new ListNode(2)
let third = new ListNode(0)
let last = new ListNode(-4)
head.next  = second
second.next = third
third.next = last
last.next = second
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let single = head, double = head
    while(single && double){
        if(!single) return false
        single = single.next
        if(double.next){
            double = double.next.next
            if(!double) return false
            if(single.val === double.val) return true
        }
    }
    return false
};
console.log(hasCycle(head))