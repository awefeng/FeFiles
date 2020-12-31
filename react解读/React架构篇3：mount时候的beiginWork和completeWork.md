#### mount时候的beginWork

mount的时候，react只建立了一颗`FiberRootNode`->`rootFiber`A树，然后就进入第一次`beginWork`

1. 进入第一次`beiginWork`，此时`beginWork`参数中的`current`代表A树中的`rootFiber`，`workInProgress`树代表B树中的`rootFiber`。

2. 进入第二次`beginWork`，此时A树中已经没有节点，`current`则为null，`workInProgress`树会去生成子节点，即我们的`App`。

   ![image-20201228224957078](/Users/awefeng/Code/summary/react解读/第二次beginWork的节点App.png)

3. 