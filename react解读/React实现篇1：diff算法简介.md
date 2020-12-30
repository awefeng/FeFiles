#### 一些节点的概念

对于一个`DOM节点`，同时可能有4个和它相关的节点：

1. current fiber节点：非mount的时候，双缓存中current树中对应的fiber节点
2. workInProgress节点：双缓存中，workInProgress树对应的fiber节点
3. DOM节点：就是它本身
4. JSX对象：就是这个DOM在react中对应的代码（就是`<div>xxx</div>`这种）通过`React.createElement()`创建的。



#### Diff算法

diff算法就是在`update`阶段时，`reconcilerChildren`函数执行的事务：通过current fiber节点 和 对象进行对比，来生成workInProgress fiber节点。



不改进对比算法，会产生O(n)3的复杂度，因此React进行diff的时候有三个原则（或者说是两个）：

1. 如果一个DOM在前后更新中，层级改变了，diff不会去复用它。（也就是第二条）
2. 同级元素如果标签改变了，则diff也不会去复用它，React会拆掉当前节点以及之后的current树（删除current树后，后面的逻辑就和mount的时候产生workInProgress树一样的逻辑），然后重新走一遍构建流程。对应生命周期就是：`componentWillUnmount` ->`componentWillMount`->`componentDidMount`。包括组件树的state也会跟着销毁。
3. React开发者能够通过给组件添加key属性来暗示react哪些组件是稳定的。

