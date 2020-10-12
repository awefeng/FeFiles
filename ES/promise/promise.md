#### Promise的状态

1. `Promise`有三个状态：`pending`, `fulfilled`, `rejected`
2. 状态变化只有两种：`pending -> fulfilled`或`pending -> rejected` 
3. 状态改变后，不会在改变。
4. 状态不会受外部影响，只受`promise`内部的逻辑影响
5. 状态改变以后再添加回调（`then catch`），也会执行。（与事件`event`不一样）
6. 缺点：不能取消，`promise`状态不可知



