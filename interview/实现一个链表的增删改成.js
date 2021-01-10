class Node{
    constructor(val){
        this.val = val
        this.next = null
    }
}

class NodeList{
    constructor(){
        this.size = 0
        // 虚拟一个头部
        this.dummyNode = new Node(null)
    }
    // 查找第index节点
    find(index){
        // index不符合要求一律从0 最开始查
        if(index < 0 || index > this.size){
            index = 0
        }
        let currentNode = this.dummyNode
        while(index >= 0){
            currentNode = currentNode.next
            index--
        }
        return currentNode
    }
    //添加（插入节点）, index代表插入在第index个后面
    addNode(node, index=-1){
        // index不符合要求一律放在最后面
        if(index < 0 || index > this.size){
            index = this.size
        }
        let currentNode = this.dummyNode
        while(index > 0){
            currentNode = currentNode.next
            index--
        }
        let proNode = currentNode.next
        currentNode.next = node
        node.next = proNode
        this.size++
    }
    // 修改第index个node的值
    change(index, value){
        let currentNode = this.find(index)
        currentNode.val = value
    }
    // 删除第index个节点
    delete(index){
        // index不符合要求一律放在最后面
        if(index < 0 || index > this.size){
            index = this.size
        }
        let currentNode = this.find(index)
        // 该节点的前一个节点
        let preNode
        if(index === 0){
            preNode = this.dummyNode
        }else{
            preNode = this.find(index - 1)
        }
        // 该节点的后一个节点
        let proNode = currentNode.next || null
        preNode.next = proNode
        this.size--
        return currentNode
    }
}

let list = new NodeList()
let first = new Node('first')
let second = new Node('second')
let three = new Node('three')
list.addNode(first)
list.addNode(three)

list.addNode(second, 1)
console.log(list)
console.log(list.find(2).val)
list.change(2, 'threechange')
console.log(list.find(2).val)

console.log(list.delete(1))
console.log(list)
