/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 function ListNode(val) {
        this.val = val;
         this.next = null;
 }
 const l1 = new ListNode(2)
 l1.next = new ListNode(4)
l1.next.next = new ListNode(3)

const l2 = new ListNode(5)
l2.next = new ListNode(6)
l2.next.next = new ListNode(4)

var addTwoNumbers = function(l1, l2) {
    let result = temp = {val: 0, next: null}
    while(l1 || l2){
        if(l1){
            temp.val = l1.val + temp.val 
            l1 = l1.next   
        }
        if(l2){
            temp.val = l2.val + temp.val
            l2 = l2.next
        }
        if(temp.val >= 10){
            temp.val = temp.val -10
            temp.next = {val: 1, next: null}
        }
        if((l1 || l2) && !temp.next){
            temp.next = {val: 0, next: null}
            
        }
        temp = temp.next
    }
    return result
};
console.log(JSON.stringify(addTwoNumbers(l1, l2)))