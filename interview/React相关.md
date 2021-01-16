#### Virtual-DOM是什么

虚拟DOM是前端框架中，为了解决直接操作DOM带来的性能低下、复杂等，采用的一种解决办法。是JS对象，有`children`，`tag`，`props`等属性，当交互产生一次更新后，通过计算出最后生成的V-DOM，最后通过`render`来生成真实`DOM`来挂在到浏览器上。



#### React 合成事件

React考虑到不同浏览器之间API的差异以及这些差异对框架代理的影响。因此实现了一个跨浏览器包装器，将大部分浏览器的API进行统一包装，以达到在用React写事件的时候能够统一。

开发者如果想调用浏览器的原生事件，则调用`nativeEvent`属性。



#### React 高阶组件 HOC

React高阶组件是用来复用其他组件逻辑的技巧，是包裹复用组件的更外一层组件，或者说是参数为复用组件，返回一个新组件的函数。HOC类似工厂模式。



#### React 中的setState是同步还是异步

根据最新版本的React，`setState`同步还是异步在不同不模式下不同：

1. 在`legacy`模式下（也就是调用`React.render()`），如果`setState`引起的变化命中了React中的批处理`batchedUpdates`，则批处理会将所有时间合成一个事件然后再进行调用，此时`setState`就是异步；如果`setState`引起的变化未命中批处理情况，则是同步。

   如何跳过`batechedUpdate`：在`batechedUpdate`源码中，当执行回调以后，会将表示要进行批处理的变量重置，因此我们只需要将会回调函数变成异步，比如用`setTimeout`包裹。则`setState`会等到批处理重置后进行执行。这个时候`scheduleUpdateOnFiber`每次发起更新的时候，没检测到批处理变量，就会同步执行更新，这个时候`setState`就是同步的。

2. 在`concurrent`或者`blocking`模式，（`blocking`模式是`concurrent`模式的过渡，不进行讨论）: `setState`在未被`setTimeout`包裹的时候，和`legacey`模式是一样的逻辑。但是被`setTimeout`包裹的时候，因为`concurrent`模式增加了lane模型，在`scheduleUpdateOnFiber`中不会进行`lane===Synclane`的逻辑。英雌不会绕过批处理逻辑。

#### React生命周期 16.4版本以后

分为3个场景，分别是挂载、更新、以及卸载。

挂载：1. constructor 2. getDerivedStateFromProps 3. render  4. componentDidmount

`getDerivedStateFromProps`：在更新之前调用，返回一个state对象，如果返回一个null则不会进行更新

更新：1. getDerviedStateFromProps 2. shouldComponentUpdate 3. render 4.getSnapshotBeforeUpdate 5. componentDidUpdate

`shouldComponentUpdate`：返回true or false，用来判断是否应该被更新。首次渲染和强制更新`forceUpdate`的时候不会调用。

`getSnapshotBeforeUpdate`：在挂载到DOM之前调用，能获取到`DOM`的信息。

卸载：1. componentWillUnmount



#### UseEffect和ComponentDidMount差异

两者是围绕不同的思想进行的。

`UseEffect`等HOOKS是 状态与DOM同步 的思想，而生命周期是组件在React下的时间线。

1. ComponentDidMount会阻塞DOM的更新：render以后如果在这个生命周期里更改state引起第二次render，浏览器只会显示第二次渲染。避免闪屏，但是阻塞了DOM更新；UserEffect不会阻塞DOM的更新。
2. State和Props的捕获（更新）问题：ComponentDidMount运行的时候后会得到新的state和props，而UserEffect在创建的时候运用了闭包，不会拿到最新的state和props。



#### Hooks为什么不能放在判断里

hooks为链式调用，放在不确定的块代码中时候，假设条件不成立会导致值偏移，导致异常。



#### React Fiber 和浏览器协作过程

https://bobi.ink/2019/10/18/react-fiber/



#### React diff算法

diff算法是用来比对React在一次更新以后的前后差异，用更新前的fiber节点和产生更新的JSX来生成新的fiber节点。由于算法复杂度问题，基于两个前提进行：

1. 不是同级不进行比对，同级别，tag不一致，则直接删除当前fiber树的子树。
2. 开发者可以通过key属性来暗示哪些组件是稳定的。如果没有key，一旦插入或者删除某个子节点，React则需要重新渲染改动之后的地方。如果有key，则React则会复用，只是顺序上的变化了。



#### 数组索引作为key的情况

如果数组shift一个一个出去，则后面的数据往前移动。React会认为前几个key值没变，只是最后一个删除了。前几个key值没变，则直接会复用，假设子节点里有非受控的组件，则会导致非受控组件也不会变，现象就是删除第一个后第二个变成第一个，但是非受控组件还是原来第一个的内容。



#### React父子组件通信

1. 父组件向子组件传递props
2. 子组件回调父组件回调，返回值
3. context
4. 状态库 Redux mobx Unstated等
5. 订阅监听模式



#### 什么是Portals

Portals是将子组件挂载到父组件之外的一种方案



#### React有哪些优化手段

1. 使用`useMemo`，`useCallback`来缓存结果或者函数
2. 使用`React.memo`来包裹没有副作用的组件
3. 使用`React.PureComponent`来优化纯组件：`React.PureComponent`仅浅比较`props`和`state`有没有变化，并且没有实现`shouldComponetUpdate`
4. 使用Suspense和lazy来进行懒加载
5. 使用`React`的生产版本
6. 使用chrome的性能分析，分析耗时组件
7. 虚拟长列表进行优化



#### React如何区分Class Component 和Function Component

1. 可以用`MyClassComponent instanceof React.Component`方式来进行判断，但是当项目中有多个`React`副本的时候(一般不可能，除非引入了多个React版本)，此方法可能出现``MyClassComponent extends React1`但是检查的时候`MyClassComponent instanceof React2.Component`

2. 在`React Component`源码中在组件基类`Component`中加了个属性用来判断是不是类Component：

   源码

   ```javascript
   Component.prototype.isReactComponent = {};
   ```

   



#### React Hooks是什么 怎么理解

React的Hooks是框架设计者针对React不同的阶段抽象出来的原子操作，比如想state，props等。是对React底层（三阶段）的具体抽象。而生命周期用来描述React组件的历程。









