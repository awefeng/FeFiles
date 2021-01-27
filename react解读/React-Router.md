#### 路由的概念

在网络中：网络分组从源到目的地，决定分组的路径以及端到端的过程。

在前端上类比：通过路径来决定当前显示的界面，即通过`path`来决定加载的组件。



#### history 对象

记录当前标签页的会话历史：

- `back()`: 后退一步
- `forward()`: 向前一步
- `go(number)`: 向前或向后
- `length`: 堆栈长度
- `pushState()`: 添加一条历史记录
- `replaceState()`: 修改一条历史记录
- `popState()`: 历史记录发生改变的时候会，`popState`回调事件会发生（如果定义了）
- `listen()`：监听history的变化



#### location 对象

location对象记录了当前页面的url信息，属性都是可读写的。

例子：`https://www.google.com:80/index.html?name=awefeng&year=2021#hashval`

`location.key`是用来唯一标识这个`location`对象的

| 字段（key）    | 描述       | 值                                              |
| :------- | --------------------------------------------- | ------------------------------------------------------- |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚）。       | #hashval                                     |
| host     | 设置或返回主机名和当前 URL 的端口号。         | www.google.com:80                          |
| hostname | 设置或返回当前 URL 的主机名。                 | www.google.com                                |
| href     | 设置或返回完整的 URL。                        | https://www.google.com:80/index.html?name=awefeng&year=2021#hashval |
| pathname | 设置或返回当前 URL 的路径部分。               | index.html                                  |
| port     | 设置或返回当前 URL 的端口号。                 | 80                                                     |
| protocol | 设置或返回当前 URL 的协议。                   | https:                                         |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 | ?name=awefeng&year=2021             |

方法和属性：

- `assign()`：加载一个新文档 `window.location.assign('http://google.com')`相当于`window.location='http://google.com'`相当于`window.location.herf = 'http://google.com'`
- `reload()`： 重载当前文档
- `replace()`：替换当前文档（不会在`history`生成新的历史记录）



#### React-Router 主要组件介绍

官网： https://reactrouter.com/web/guides/quick-start

`React-Router`利用`history`历史记录来实现类似`router.back`、`router.go`等方法。同时使用`location`来表示当前页相关的信息。

`V4`及其以后的版本，`React-Router`像`React`一样，将核心和环境进行分离了。核心部分离成单独的包`React-Router`，运行环境分为了`React-Router-DOM`和`React-Router-Native`包。``React-Router-DOM`和`React-Router-Native`包只是简单的在`React-Router`基础上，结合浏览器环境或者APP环境提供了一些封装。

所以我们直接跳过`V3`，直接开始`V4`版本。



##### Router

`<Router>`是一个容器，用来保存当前环境下（`DOM`或者非`DOM`）的路由状态（`history`），在`React-Router`中，提供了`Router`和`MemoryRouter`两个组件，在`React-Router-DOM`和`React-Router-Native`提供了`BrowerRouter`、`NativeRouter`两个组件。

```jsx
// <BrowerRouter>
function BrowerRouter = (props) => {
  const history = createBrowerHistory()
  const {children = null} = props
  return <Router history={history} children={children} />
}
```



##### Route

`<Route>`组件功能就是定义某个`path`该显示什么东西。

1. 使用`matchPath`来判断当前的配置的属性中path是不是符合当前`location`中的`pathName`。
2. 在渲染返回中加一个`Context.Provider`，用来提供获取`router`的`Hooks`钩子，比如`useHistory`、`useParams`等。
3. 对于第1步中，符合则后续进行渲染，不符合则跳过。

```jsx
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 0. 比较流行的 源码的一种错误处理方式，挂载捕获error的钩子
          invariant(context, "You should not use <Route> outside a <Router>");
					// 1. 拿到context
          const location = this.props.location || context.location;
          // 2. 匹配location path
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          let { children, component, render } = this.props;

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }

          return (
            // 渲染  不mach的 或者其它情况不满足条件的 返回null  贯彻组件的概念
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === "function"
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

```

​	

##### Switch

用来限制匹配`path`的个数：匹配到一个后，后面的就不进行匹配了。



##### Link

用来改变当前`history`中历史记录。

```jsx
const Link: FC<LinkProps> = props => {
  const history = useHistory()
  const {children, replace=false, to} = props

  return (
    <View
      onClick={() => {
        if(replace){
          history.replace(to)
        }else{
          history.push(to)
        }
      }}
    >
     {children}
    </View>
  )
}
```



#### 流程

![image-20210116173457446](/Users/awefeng/Code/summary/react解读/image-20210116173457446.png)



`React-Router v3`：静态路由概念，认为是个整体工作单元。

`React-Router V4及以后`： 组件概念，路由匹配到的界面其实也是一个组件，并且会通过`path`进行多种匹配。



React-router里面用的是history库，库里面封装了listen和push，对应原生应该是popState，pushState，replaceState



#### 非Native、DOM环境下实现路由

思路：

1. 通过内存的方式创建`history`、`location`，将`hsitory`单例保存在内存中
2. `Router`挂载`history` (第1、2步骤，`React-Router`提供了`MemoryRouter`，通过`history`包创建的`createMemoryHistory`)
3. 按照`React-Router v4`版本写`Route`
4. 实现`Link`

问题：

如何通过`router.config.ts`配置路径字符串来读取`Router`的`Component`

// 动态优化https://segmentfault.com/a/1190000011765141





#### hash模式

url #后的hash内容变化后，会触发hashchange来改变，`addEventListener('hashchange', callback)`，通过hashchange来匹配component。hashchange能监听locaiton变化，a标签和前进后退。



#### 浏览器原生

通过popState来进行路由变化，`addEventListener('popState', callback)`，popState只有浏览器点击回退和前进才能触发。通过pushState和replaceState只能改变访问的浏览记录，不能够触发popState。

解决办法： pushState和repleceState以后，手动去调用popstate的回调函数，popState的回调函数是用来matchPath的。



