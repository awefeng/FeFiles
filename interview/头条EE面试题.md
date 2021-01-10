# 头条EE面试题

### 1. 以下输入顺序

```javascript
process.nextTick(()=>{
    console.log('nextTick')
})
Promise.resolve().then(()=>{console.log('promise1')}).then(()=>{console.log('promise2')})

setImmediate(()=>{console.log('setImmdiate')})

console.log('end')
```

**原因：**

浏览器环境下JS异步任务分为宏队列任务，NODE环境下异步任务的执行和浏览器不同，NODE环境下异步任务有不同的阶段，每一个阶段中的任务队列为空，或者该阶段执行的回调函数达到最大值以后；就会进入下一阶段。

1. 首先会输出end，因为其他的都是异步任务，NODE会首先执行完script
2. nextTick是在下一次轮询开始之前执行，所以第二个输出nextTick
3. promise.resovle声明了一个resolve状态的异步任务，所以第三个输出是promise1
4. 输出完promise1以后，没有抛出异常错误以及reject，所以又将后面then的添加到了该执行阶段
5. 执行阶段里还有promise2，所以又会出书promise2
6. 最后输出setImmediate



### 2. 简单叙述HTTPS获取加密密钥的过程

1. 服务器用自己的公钥和信息用第三方机构给的私钥进行加密生成一个数字签名A，并将自己的公钥、信息和数字签名A封装成证书。
2. 客户端访问服务器以后，服务器将该证书返回给客户端。
3. 客户端拿到证书以后，用第三方机构的公钥进行解密，拿到数字签名A。
4. 哭护短将服务器的公钥和信息进行hash运算，得到数字签名B，A和B相同则证明服务器正确。
5. 客户端拿到服务器的公钥以后，后续队服务器的通信都会用公钥加密，服务器接收到请求以后，用私钥解密，返回内容用私钥加密。（非对称加密）



### 3. 隐藏Footer

1. 使用相对定位和绝对定位，将page相对定位，然后给footer决定定位

   ```css
   html,body{
   	height: 100%;
       margin: 0;
       padding: 0;
   }
   .page{
   	position: relative;
       min-height: 100%;
   }
   footer{
       position: absolute;
       bottom: 0;
       width: 100%;
   }
   <div class="page">
   	<header></header>
   	<section></section>
   	<footer></footer>
   </div>
   ```

2. 使用弹性布局

   利用弹性布局的grow 和shink

   ```
   .page{
       display: flex;
       flex-direction: column;
       min-height: 100%;
   }
   header{
       background: #999;
       height: 100px;
       flex: 0 0 auto;
   }
   section{
       background: #666;
       flex: 1 0 auto;
   }
   footer{
       background: #333;
       height: 100px;
       flex: 0 0 auto;
   }
   ```

   

### 4. 实现Bind输出success 

```javascript
if(!Function.prototype.myBind){
    Function.prototype.myBind = function(context){
        let args = Array.from(arguments).slice(1)
        let func = this
        function bnd(){}
        bnd.prototype = this.prototype
        let fn =  function(){
            let newArgs = [...arguments]
            return func.call(this instanceof fn ? this : context, ...args.concat(newArgs))
        }
        fn.prototype = new bnd()
        return fn
    }
}
```



### 5. 正则和非正则实现千分位

```javascript
function fun1(number){
	return number.toLocaleString()
}

function fun2(number) {
    return number.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
}

function fun3(number){
     let str1 = number.toString()
     let str2
     if(str1.indexOf('.')> -1){
        str2 = str1.substring(str1.indexOf('.'))
        str1 = str1.substring(0 ,str1.indexOf('.'))
     }
     let arr = []
     let tag = 0
     for(let i = str1.length -1; i>=0;i--){
         arr.push(str1[i])
         tag++
         if(tag === 3){
             tag = 0
             arr.push(',')
         }
     }
     return arr.reverse().join('').concat(str2)
}
```

