### 1. 盒子模型

盒子模型指的的是一块区域：包含 ```width height padding border margin```

#### 标准盒子模型

标准盒子模型中```width height```就是指的内容的宽度和高度

```width = content_width + padding_left + padding_right + border_left + border_right```

```box-sizing: content-box``` 将元素设置为W3C标准盒子，默认值，一般不用设置

#### IE盒子模型（怪异模型）

IE盒子模型中```width height```指的是```padding  border```+内容的宽度和高度

```width = content_width```

```box-sizing: border-box``` 将元素设置为IE盒子



### 2. CSS选择器

CSS选择器有：

​		id选择器（#root）

​		class选择器（.className)

​		标签选择器（div，h1...）

​		相邻选择器 （div + p）

​		子选择器（div > p）

​		后代选择器（div p)

​		通配符（*）

​		属性选择器（span[title="me"]）

​		伪类选择器（a:hover div:nth-child）



### 3. CSS优先级

优先级计算方式：

按照样式的优先级进行计算，优先优先级高的。

1. ```!important```优先级最高，如果有多个，则按最后一个处理。

2. 优先级相同的，则按照最后一个处理。

3. 继承得到样式的优先级最低。

4. 样式优先级：!important > 内联样式 > 选择器样式（其中 id > class > tag）

   

### 4.如何居中div

知道父元素和子元素高度的情况下，可以使用绝对定位 +transform

不知道的情况下可以用flex

（面试的时候能说出来就行）

### 5. CSS display属性

display属性指的是元素的框的类型，几种常用的值：

```inline```：内联元素 默认值，元素前面和后面没有换行符，设置不了```width height```

```block```： 块元素，元素前面和后面都会有换行符，可以设置元素的```width height```

```none```： 此元素会被隐藏，并且也不会保留空间

```inline-block```：行内块元素，融合了```inline```和``block``的特性：前后没有换行符并且可以设置`width`和`height`

`flex`: 弹性布局，指的是该元素内部的元素会按照`flex`布局进行



### 6. position的值

position指的是元素的定位

`static`:：默认，按照正常文档流进行定位

`relative`：相对定位，不脱离文档流，基于`static`进行偏移 (top left bottom right)

`absolute`：绝对定位，脱离文档流，基于最近的一个布局不是`static`的父元素进行定位(top left bottom right)

`fixed`：固定定位，参照可视窗口进行定位

`sticky`：粘性定位，可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。



### 7.flex布局

`flex`指的是弹性布局，将元素`display: flex`后，形成弹性容器，在这个元素里的子元素就能进行弹性布局。

#### 针对容器：

  1. ```flex-direction```：弹性容器里的元素排序方式，值：

     `row`：从左到右 水平排列

     `row-reverse`：从右到左 水平排列

     `column`：从上到下 竖直排列

     `column-reverse`：下到上 竖直排列

		2.	```flex-wrap```：是否换行，值：`nowrap,wrap,wrap-reverse`
	
		3.	`flex-flow`： `flex-direction`和`flex-wrap`的结合
	
		4.	`justify-content`：`flex-direction`的对齐方式，（比如row的时候就是水平怎么对齐，是两端对齐还是中间相隔距离相同对齐等）
	
		5.	`align-items`： 相对于`flex-direction`的交叉轴对齐方式，（比如上下对齐，往上对齐，往下对齐，中间对齐）
	
		6.	`align-content`：`flex-wrap`换行了，多行的时候才可以起效果。

#### 针对子元素：

`order flex-grow flex-shrink flex-basic  align-self`



