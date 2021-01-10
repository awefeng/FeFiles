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
var addTwoNumbers = function(l1, l2) {
    if(!l2){
        return l1
    }
    let result = new ListNode(0)
    let temp = result
    while(l1 && l2){
        let sumTemp = l1.val + l2.val
        if(sumTemp >= 10){
            temp.val = sumTemp - 10
            l1.next ? l1.next.val++ : l1.next = new ListNode(1)
        }else{
            temp.val = sumTemp
        }
        if(l1.next || l2.next){
            temp.next = new ListNode(0)
        }
        temp = temp.next
        l1 = l1.next
        l2 = l2.next
    }
    // 如果l1比l2长
    if(l1){
        while(l1){
            if(l1.val > 10){
                temp.val = l1.val - 10
                l1.next ? l1.next.val++ : l1.next = new ListNode(1)
            }else{
                temp.val = l1.val
            }
            if(l1.next){
                temp.next = new ListNode(0)
                temp = temp.next
                l1 = l1.next
            }
        }
    }else{
        while(l2){
            temp.val = l2.val
            if(l2.next){
                temp.next = new ListNode(0)
                temp = temp.next
                l2 = l2.next
            }
        }
    }
    return result
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}
