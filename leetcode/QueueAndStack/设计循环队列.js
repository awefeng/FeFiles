/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.head = 0
    this.tail = 0
    this.size = k
    this.queue = new Array(k)
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if(this.isFull()) return false
    this.queue[this.tail++] = value
    this.tail = this.tail%this.size
    return true
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if(this.isEmpty()) return false
    this.queue[this.head++] = undefined
    // 循环
    this.head = this.head%this.size
    return true
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if(this.isEmpty()) return -1
    return this.queue[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if(this.isEmpty()) return -1
    // 因为tail是最后一个元素的索引+1 所以这里要考虑tail为0 的时候
    return this.queue[(this.tail+this.size -1)%this.size]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    // tail和head重合 并且重合的地方没有值 则清空了
    return this.tail === this.head && this.queue[this.head] === undefined
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    // tail和head重合 并且重合的地方有值 则证明已经填满了
    return this.tail === this.head && this.queue[this.head] !== undefined
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
var queue = new MyCircularQueue(3)

queue.enQueue(1)
queue.enQueue(2)
queue.enQueue(3)
console.log(queue.enQueue(4))