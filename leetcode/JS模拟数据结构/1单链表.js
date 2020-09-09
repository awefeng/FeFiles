// https://leetcode-cn.com/leetbook/read/linked-list/jy291/
// 设计链表
/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
    this.head = null
    this.len = 0
};

function LinkNode(val){
    this.val = val
    this.next = null 
}
/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    let temp = this.head
    while(index >0){
        temp = temp.next
        if(temp){
            index--
        }else{
            return -1
        }
    }
    return temp.val
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    let headNode = this.head
    let add = new LinkNode(val)
    // 以前就有头结点
    if(headNode){
        add.next = headNode
    }
    this.head = add
    this.len = this.len + 1
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    let temp = this.head
    while(true){
       if(temp.next){
           temp = temp.next
       }else{
           temp.next = new LinkNode(val)
           this.len+=1
           break
       }
    }
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index <=0){
        this.addAtHead(val)
        return 
    }
    let pre = null, cur = this.head
    while(index > 0){
        index--
        // 如果还没到链表尾部
        if(cur){
            pre = cur
            cur = cur.next
        }else{
            break 
        }
    }
    let add = new LinkNode(val)  
    if(cur){
        add.next = cur    
    }
    pre.next = add
    this.len+=1
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(index < 0 || index >= this.len) return 
    if(index === 0){
        let head = this.head
        if(head){
            this.head = head.next
        }else{
            this.head = null
        }
        this.len-=1
        return
    }
    
    let cur = this.head
    let pre = null
    while(index >0){
        pre = cur
        if(cur.next){
            cur = cur.next
        }else{
            //如果到末尾了 直接return
            return
        }
        index--
    }
    pre.next = cur.next
    this.len -=1
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
const  linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.deleteAtIndex(0);  //现在链表是1-> 3

console.log(linkedList)