## React 源码目录及调试

### 源码目录

React架构对应3层：`scheduler` `reconciler` `renderer`

除去配置文件和文件夹以后：

```
根目录
├── fixtures        # 包含一些给贡献者准备的小型 React 测试项目
├── packages        # 包含元数据（比如 package.json）和 React 仓库中所有 package 的源码（子目录 src）
├── scripts         # 各种工具链的脚本，比如git、jest、eslint等

```

着重关注`packages`下面的结构

```
packages目录
├── scheduler 实现调度器相关的代码
├── shared  公用方法和变量
├── react-dom/art/native  renderer
├── react-reconciler  协调器的实现 源码分析主要点
```

### 源码调试

1. ```sh
   git clone https://github.com/facebook/react.git
   ```

2. ```
   cd react
   yarn
   yarn build react,react-dom,scheduler --type=NODE
   # 构建 reconciler renderer scheduler 
   ```

3. ```
   cd build/node_modules/react
   # 申明react指向
   yarn link
   cd build/node_modules/react-dom
   # 申明react-dom指向
   yarn link
   ```

4. ```
   npx create-react-app demo //创建项目 
   ```

5. ```sh
   cd demo
   yarn link react react-dom // 将项目中的react react-dom指向我们编译的（开始之前yarn link的）react react-dom
   ```

