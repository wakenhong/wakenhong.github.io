---
title: 使用FLEX实现一种上下高度不固定的自适应布局
date: '2019-12-22 10:05'
author: liyang
categories: 技术分享
img: 'https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_103338.png'
toc: false
tags:
  - CSS
  - FLEX布局
abbrlink: 340a
---

此布局的需求是：头部高度不固定，由子元素撑高，中间内容高度不固定，自动填满父容器剩余高度，底部高度固定。
![](https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_103338.png)

这种布局是下面这种布局的变种：

![](https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_101238.png)

头部和中间内容都变成了不固定的，一般用于后台管理系统，上部分是一些查询条件和操作按钮，查询条件个数不固定，中间部分是表格内容，底部一般用于分页，固定高度。

此种布局用flex可以很容易的实现：父容器设置高度为100%，flex-direction设置为column(主轴设置为竖向)，上部flex-shrink设置0，下部flex-grow设置1，底部flex-shrink设置0。

CSS部分：
```css
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    .wrapper {
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    .head {
        border: 1px solid red;
        padding: 15px;
        flex-shrink: 0;
        margin-bottom: 10px;
    }

    .content {
        border: 1px solid blue;
        flex: 1;
        padding: 15px;
        margin-bottom: 10px;
        line-height: 50px;
        overflow: auto; //此行是关键 
    }

    .foot {
        flex-shrink: 0;
        padding: 10px;
        border: 1px solid green;
    }
```

HTML部分：

```html
<div class="wrapper">
  <div class="head">
    <p>子元素</p>
    <p>子元素</p>
    <p>子元素</p>
    <p>子元素</p>
  </div>
  <div class="content">
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
    <p>内容</p>
  </div>
  <div class="foot">
    <p>底部</p>
  </div>
</div>
```

![](https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_105339.png)

中间的内容用来放element-ui的表格，表格高度设置为100%，可以达到固定表头内容滚动的效果，一切看起来都很美好。

![](https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_110422.png)

然而最近我重装了一次系统然后把chrome升级到79版本后，发现一个蛋疼的事情，这种方式居然失效了，出现了下面的情况：

![](https://images.liyangzone.com/article_img/技术相关/FLEX上下布局/20191221_135805.png)


中间的内容高度设置失效了，也变成了由子元素撑高。起初我怀疑是element-ui的锅，然后换了不同版本的element-ui后还是如此，然后我又怀疑可能是node版本的问题，因为我重装系统后把node由v8换成了v10,当我切换成v8后还是如此。后来我在同事的电脑上查看，他们居然没有出现这种情况，问题到底出现在了哪里？经过仔细排查后，这个锅最终落在了chrome头上，当我把chrome装回78版本后，一切又变得正常了。


然后我发现这个问题也在firefox上面出现了，这种布局似乎只能在chrome78及以下生效(IE11也生效)。然而我不能阻止用户把chrome升级到79版本或使用firefox浏览器，所以这个问题的根源也不在chrome或firefox,一定是别的什么地方出现了问题。

最终问题定位到了BFC(块格式化上下文,Block Formatting Context)上面，关于BFC的概念你可以前往[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)查看。

问题的关键就是要为page-body为这个div创建BFC，让它里面的元素不会影响到外面的元素，下列方式会创建块格式化上下文：

```
根元素(<html>)
浮动元素（元素的 float 不是 none）
绝对定位元素（元素的 position 为 absolute 或 fixed）
行内块元素（元素的 display 为 inline-block）
表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
overflow 值不为 visible 的块元素
display 值为 flow-root 的元素
contain 值为 layout、content或 paint 的元素
弹性元素（display为 flex 或 inline-flex元素的直接子元素）
网格元素（display为 grid 或 inline-grid 元素的直接子元素）
多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。
```
 
不过我试了多种方式，都没有生效，只有设置 `overflow: auto` 之后才生效。

这个问题的根本原因就是浏览器创建BFC的规则不一致，chrome78以下版本和IE11会为`display`为`flex`的直接子元素创建BFC，不管这个子元素的overflow值为什么(默认值为visible)， chrome79版本及firefox则不会，只有设置 了`overflow: auto`之后才会创建BFC，不确定这是chrome79的feature还是bug。

原生HTML+CSS源码地址:[点击前往](https://codepen.io/liyang5945/pen/povvVbe)。
vue + element-ui版源码地址：[点击前往](https://codepen.io/liyang5945/pen/abzJybY)。





