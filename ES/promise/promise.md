#### Promise的状态

1. `Promise`有三个状态：`pending`, `fulfilled`, `rejected`

2. 状态变化只有两种：`pending -> fulfilled`或`pending -> rejected` 

3. 状态改变后，不会在改变。

4. 状态不会受外部影响，只受`promise`内部的逻辑影响

5. 状态改变以后再添加回调（`then catch`），也会执行。（与事件`event`不一样）

6. 缺点：不能取消，`promise`状态不可知

   

   例子：[promise的状态](./promise的状态.ts)



#### Promise的回调

1. `promise`的`.then`方法两个函数参数：`resolve`后的回调和`reject`的回调。
2. `promise`中调用`return`以后，后面的代码就不会执行了，包括`resolve`和`reject`
3. `promise`中调用`resolve`或者`reject`以后，后面的代码还是会执行，除非显示的调用`return`
4. `promise`中的`catch`其实就是`.then(null | undefined, rejectFunc)`
5. `promsie`中的`then`会返回一个新的`promise`，因此有链式调用`.then().then()`
6. 因为`.catch`其实是`.then`的语法糖，所以`.catch`也是返回的一个`promise`，因此也可以`.catch().then()`
7. `promise`状态改变以后，就不会再改变了，比如已经`resolve`了，再去后面抛一个异常，`promise`后面的`catch`是捕获不到异常的
8. `promise`的`finally`也是返回一个`promise`



​		例子：见文件夹

