#### webpack的原理是什么？

通过读取以及merge配置后，检索出模块`module`（一个模块其实就是一个文件） 依赖图，通过`loader`的转换以及`plugin`的扩展，来将整个工程从`entry`开始进行编译打包，进行代码分割和合并，生成`chunk`，最后根据配置的`output`进行输出打包结果。

#### webpack的基本概念

`Entry`：入口，webpack构建的时候对文件进行编译打包的第一步

`Module`：模块，其实就是`ES6 CommonJS Amd Cmd`等模块概念

`Chunk`：webpack在编译过程中根据依赖图划分的块，**编译过程中**。

`bundle`：编译后的产物，包含了经过加载和编译后的源文件，可以直接在浏览器里运行。

`output`：输出目录

`loader`：转换器，webpack只能对`js json`进行处，配置`loader`可以让webpack能够处理其他格式的文件；本质上`loader`是将这些不能处理的文件转换为依赖图能够直接引用的模块

`plugin`：对webpak功能扩展，webpack在编译打包的时候会广播出特定的事件，`plugin`做的事情就是去监听这些事件，然后完成自己的功能后将编译结果传播下去。

#### bundle 和 chunk的区别

1. bundle是编译后的最终生成产物，chunk是webpack在编译过程中的根据模块依赖图划分出来的块；一个是编译后的产物，一个是编译中的概念。

2. 对应关系：一般一个chunk块对应一个bundle输出，一对一关系。但是通过`plugin`的某些扩展后，一个chunk可能生成多个bundle（代码分割，按需加载）。

   ![webpack_chunk_bundle](/Users/awefeng/Code/summary/面试准备/webpack_chunk_bundle.png)



#### webpack工作流程

工作流程大致可以分为：

1. 编译前的准备阶段
2. 编译阶段
3. 处理编译结果阶段



编译前的准备阶段：组装配置、添加默认插件、初始化complier

1. 读取`config.js`和shell命令中的参数来merge出配置，校验配置生成`options`。
2. 应用`node.js`文件风格（模块风格）到compiler类上
3. 添加默认参数：类似`options = Object.assign({}, defaultOptions, options)`
4. 初始化complier：`complier = new Complier(options.context)`
5. 添加一系列`plugin`（系统默认的+config配置的）：按顺序依次调用`plugin`的`apply`方法，传入`complier`：类似`toRunApply(plugins, complier）`



编译阶段：

1. 清除上一次构建的缓存，启动新一轮的编译
2. 通过编译前产生的complier来启动编译
3. 编译中会将js转换为AST，递归AST，会结合loader将css、img等其他资源转换为js的引用



处理编译结果阶段：

1. 编译后build产生chunk块，各种优化模块（代码分割，压缩等）进行工作。
2. 生成最终代码形成bundle
3. 输入最后编译文件夹



#### webpack的打包优化

1. 项目引入`webpack-bundle-analyzer`等第三方打包分析工具，打包后打开分析结果页进行占用分析
2. 生成环境关闭`source map`
3. 资源压缩：webpack和nginx配置`Gzip`压缩
4. 调用的第三方库配置按需加载
5. 使用CDN（内容分发网络，使用户就近获取所需内容减少延时）
6. 其他一些优化吗，比如代分割等。



#### webpack的HMR原理（模块热替换）

HMR在应用程序允许的时进行模块的增加、删除、修改操作，而无需让程序重新加载

1. 应用程序要求HMR runtime检查更新
2. 检查到更新，HMR进行更新模块的异步下载，返回给应用程序有更新可用
3. 应用程序给HMR下达更新命令
4. HMR runtime进行同步更新：manifest（webapck编过程中的所有模块的数据集合）更新和chunk块更新
5. chunk块更新是编译阶段，需要更深入。



#### loader的加载顺序及场景的loader

对于配置中处理一类文件的loader是顺序从右往左进行，compose模式而不是pipeline模式，类似函数式调用。

常见loader：style-loader css-loader sass-loader less-loader file-loader babel-loader等

打包sass文件需要哪些loader：['style-loader', 'css-loader', 'sass-loader']



#### plugin原理、自己编写plugin、常用的plugin

plugin原理就是去监听webpack在打包的时候的事件，在实现上就是plugin调用webpack的钩子函数，webpack初始化complier以后会调用plugins。

常用的plugins：

​	htmlwebpackplugin->自动插入生成后的entry到模板html 

​	CleanWebpackPlugin-> 清楚上一次打包生成的dist

​	Code Splitting插件等

自己编写plugin必须实现 `apply`函数传入compiler，监听某一个钩子：

```javascript
class MyCustomPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('MyCustomPluginName', compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```











