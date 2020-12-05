### Context 的用法

1. 创建Context

   ```javascript
   const MyContext = React.createContext("default value")
   ```

   声明的时候必须导出或者全局声明，不然在```Consumer```的时候拿不到```context```

   ```javascript
   export const MyContext = React.createContext("xxx")
   
   export default function () => {
     return <MyContext.Provider value={'awefeng'}></MyContext.Provider>
   }
   // 注意： 当value为对象的时候 不要在value里直接写一个对象 应当声明在外面 然后value={该对象} 防止父组件每次更新的时候导致Provider每次都赋值一个新的对象
   ```

   ```javascript
   import {MyContext} from './xxx'
   
   export default function ()=>{
   	return <MyContext.Consumer>{value => <p>{value}</p>}</MyContext.Consumer>
   }
   ```

   

2. 给组件挂在Context

   ```MyContext.Provider```

   如果没有给组件挂在Context，则子组件里有获取Context的时候，则会获取到默认值。

   

3. 组件获取Context

   ```javascript
   // for 1 class组件和函数组件通用
   <MyContext.Consumer>{(value) => {
     // TODO 
   }}</MyContext.Provider>
   
   // for 2 主要函数组件  class组件也可以用hook 所以class组件也可以用
   const value = useContext(MyContext)
   
   // for 3 class组件 携带 contextType + this.context
   class MyComp extends React.Component{
     constructor(props){
   		super(props)
       // 获取
       const value = this.context
     }
   }
   MyComp.contextType = MyContext
   ```



4. 采用新的Context 调用方法，过时的API就不要使用了

