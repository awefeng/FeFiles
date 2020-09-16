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
// 双指针 添加后链
// 在A B 链表后面添加链表 B A 形成新的链表 P1 = A+B P2 =B+A
// 因为P1长度=P2长度，如果A B 有相交 那遍历P1 P2到后面相交的地方 是肯定相等的 如果不相交 是肯定不等的

var getIntersectionNode = function(headA, headB) {
    let aNode = headA, bNode = headB
    let aIsAdded = false,bIsAdded = false
    while(aNode && bNode){
        if(aNode === bNode){
            return aNode
        }
        if(!aNode.next && !aIsAdded){
            aNode = headB
            aIsAdded = true
        }else{
            aNode = aNode.next    
        }
        if(!bNode.next && !bIsAdded){
            bNode = headA
            bIsAdded = true
        }else{
            bNode = bNode.next
        }
        
        
    }
    return null
};

/* 优化 上面的代码 假设没有相交 则这个时候 aNode为null bNode为null aNode === bNode

var getIntersectionNode = function(headA, headB) {
    let aNode = headA, bNode = headB
    while(aNode !== bNode){
        aNode = aNode ? aNode.next : headB
        bNode = bNode ? bNode.next : headA
    }
    return aNode
}
*/