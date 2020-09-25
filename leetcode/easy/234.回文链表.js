/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// O(n) O(n)
var isPalindrome = function(head) {
    let cur = head, cache = []
    while(cur){
        cache.push(cur.val)
        cur = cur.next
    }
    let end = cache.length -1, start = 0
    while(start < end){
        if(cache[start] !== cache[end]) return false
        start++
        end--
    }
    return true    
};

//2. 快慢指针 快 = 2 * 慢 找到中位节点然后反转后面的链表 遍历链表
// @lc code=end

