### 1. 盒子模型

盒子模型指的是CSS中用来表达一个DOM节点的设计模式，一个节点盒模型化以后，会包含 ```width height padding border margin```等CSS信息。

#### 标准盒子模型

标准盒子模型中```width height```就是指的内容的宽度和高度

```width = content_width```

```box-sizing: content-box``` 将元素设置为W3C标准盒子，默认值，一般不用设置

#### IE盒子模型（怪异模型）

IE盒子模型中```width height```指的是```padding  border```+内容的宽度和高度

```width = content_width + padding_left + padding_right + border_left + border_right```

```box-sizing: border-box``` 将元素设置为IE盒子

### 2. CSS选择器

CSS选择器有：

​		id选择器（#root）

​		class选择器（.className)

​		标签选择器（div，h1...）

​		属性选择器（span[title="me"]）

​		伪类选择器（a:hover div:nth-child）

​		伪元素（a:before{ context: ""} a:after{}）

### 3. CSS优先级

优先级计算方式：

CSS同属性，优先级才会有意义，才会进行覆盖，按照样式的优先级进行计算，优先优先级高的。
1. ```!important```优先级最高，如果有多个，则按最后一个处理。

2. 优先级相同的，则按照最后一个处理。

3. 继承得到样式的优先级最低。

4. 样式优先级：!important > id选择器 > 类选择器 属性选择器 伪类选择器 > 标签选择器 伪元素选择器

### 4. CSS display属性

display属性指的是元素的框的类型，几种常用的值：

```inline```：内联元素 默认值，元素前面和后面没有换行符，设置不了```width height```

```block```： 块元素，元素前面和后面都会有换行符，可以设置元素的```width height```

```none```： 此元素会被隐藏，并且也不会保留空间

```inline-block```：行内块元素，融合了```inline```和``block``的特性：前后没有换行符并且可以设置`width`和`height`

`flex`: 弹性布局，指的是该元素内部的元素会按照`flex`布局进行

### 5. position的值

position指的是元素的定位

`static`:：默认，按照正常文档流进行定位

`relative`：相对定位，不脱离文档流，基于自身以`static`定位的位置进行偏移 (top left bottom right)，原位置会被保留。

`absolute`：绝对定位，脱离文档流，基于最近的一个布局不是`static`的父元素进行定位(top left bottom right)，不会暴露原有位置。

`fixed`：固定定位，参照可视窗口进行定位。

`sticky`：粘性定位，可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

### 6.flex布局

`flex`指的是弹性布局，将元素`display: flex`后，形成弹性容器，在这个元素里的子元素就能进行弹性布局。

#### 针对容器：

1. flex-direction：弹性容器里的元素排序方式，决定主轴方向，值：`row row-reverse column column-reverse`
2. flex-wrap：主轴上是否换行，值：`nowrap,wrap,wrap-reverse`
3. flex-flow： `flex-direction`和`flex-wrap`的结合
4. justify-content：项目在主轴上的对齐方式，（比如row的时候就是水平怎么对齐，是两端对齐还是中间相隔距离相同对齐等），值：`flex-start flex-end center space-between(第一个和最后一个元素紧挨着边框) space-around(每个元素两端间距相等)`，
5. align-items： 相对于`flex-direction`的交叉轴对齐方式，（比如上下对齐，往上对齐，往下对齐，中间对齐），值：`flex-start, flex-end, center, stretch(这个是默认值，未设置高度时，拉满), baseline（每个子元素第一行文字对齐）`
	
6. align-content：`flex-wrap`换行了，多行的时候才可以起效果。

#### 针对子元素：

1. order：优先级，子项目排序顺序，值越小越靠前 `order: 1`在`order: 2`前面
2. flex-grow： 按正常空间排列后，元素的放大比例，默认值0不进行放大
3. flex-shrink：按正常空间排列后，元素的缩小比例，默认值1，空间不够的时候缩小。
4. flex-basic：基础空间
5. align-self： 子元素对齐方式 `flex-start flex-end center stretch baseline`

### 7.BFC

BFC指的是块格式上下文，指的是一个元素标签的渲染规则，如果成为了BFC，那么这个元素里面的布局，不会影响外面的元素。
形成BFC

1. float设置为除了none以外
2. display设置为inline-block、flex
3. absolute定位
4. overview设置为除了visible以外的元素
5. body元素

同一个BFC下边距会发生元素折叠：比如margin重合


### 8. CSS外链

通过`<link href="xxx.css" />`来引用。

优点：便于管理，统一，便于复用。
缺点：额外的请求。

适用场景：风格切换等。

### 9. div居中

1. flex实现：`just-content: center, align-items: center`
2. position absolute + margin实现，适用于子元素宽高已知：父元素relative定位，子元素absolute定位，子元素`top:50% left: 50%`，然后再减去子元素的宽高的一半`margin-top: -xxpx, margin-left:-xxxpx`
3. position absolute + transform，适用于子元素宽高未知：父元素relative定位，子元素absolute定位，子元素`top:50% left: 50%`，然后子元素偏移`transform: translate(-50%, -50%)`


### 10. css单行和多行截断
单行：`white-space: nowrap; overflow: hidden; text-overflow: ellipisis;`

多行：
```
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
```

兼容性的多行：截断后用伪元素 `::after`进行控制显示

```
p {
    position: relative;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
```

### 11. 动画
1. 通过`transition`渐变动画实现
2. `transform`转变动画实现，该属性允许我们能够对元素进行旋转、缩放、倾斜、移动这四类操作.一般是配合transition的属性一起使用
3. animation：动画
4. svg
5. webgl


### 12. 具体实现

1. 实现一个三角形
`.box{width: 0px; border: 30px transparent solid; border-top: 30px solid red;}`
2. 实现一个梯形
  ```
    #test2{
      width: 50px;
      height: 50px;
      background: transparent;
      border-top: 50px solid transparent;
      border-bottom: 50px solid green;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
    }
  ```

https://www.cnblogs.com/wuguanglin/p/interestingCSS.html