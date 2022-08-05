# 本文地址

[掘金文章地址](https://juejin.cn/post/7127863547530477582/)

https://juejin.cn/post/7127863547530477582/

# 运行实例项目

- git clone 地址
- npm i
- npm run start
- 打开http://127.0.0.1:3001/

# 啥也不说，先上效果图

手机扫码即可，如果有问题可以刷新一下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/804b0bcfa7544b0d8f0903445eed035c~tplv-k3u1fbpfcp-watermark.image?)

[pc 端预览地址](https://www.zuiaiwanqian.com/pannellum/index.html)
建议打开调式模式，使用手机模式查看

https://www.zuiaiwanqian.com/pannellum/index.html

# 实现效果

react VR 全景图组件实现，超级简单，即下即用，只需要从 npm 上下载，配置所需要的场景资源，就能实现 VR 全景图效果，可调整 VR 显示效果，添加自定义热点，热点样式修改，自定义跳转场景，手机控制 VR 效果(场景随着手机一起动)，VR 全景图实例获取，多种方法事件等。

# 使用方式

使用方式很简单，只需要使用 npm 下载组件，将组件引入并传入对应参数即可

> npm i vr-react

## 最简单的使用

```js
import VrReact from "vr-react";

const scenes = {
  oneScene: {
    type: "equirectangular",
    panorama: "https://pannellum.org/images/bma-1.jpg",
  },
};
<VrReact scenes={scenes} width="100%" height="100vh" />;
```

## 添加全部参数的使用

```js
import VrReact from "vr-react";

<VrReact
  setViewer={setViewer}
  config={config}
  width="100%"
  height="100vh"
  firstSceneId="oneScene"
  scenes={scenes}
  hotSpots={hotSpots}
  delayTime={0}
/>;
```

<b>上面例子的代码在项目仓库的`example/src/app.js`</b>

所有参数的说明和使用方法在这个腾讯文档表格里面

<b>所有参数内容和使用方法都在这里面</b>

地址为[vr-react 参数文档](https://doc.weixin.qq.com/sheet/e3_AeUArQY6ACwn0vBVpMtRu6ViWUHhb?scode=AJEAIQdfAAoye9vbi7AeUArQY6ACw&tab=BB08J2)

https://doc.weixin.qq.com/sheet/e3_AeUArQY6ACwn0vBVpMtRu6ViWUHhb?scode=AJEAIQdfAAoye9vbi7AeUArQY6ACw&tab=BB08J2

部分参数截图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5f4ea66766b4b01a6bd1d50c4363ec5~tplv-k3u1fbpfcp-watermark.image?)

## react-pannellum 实例的事件

可以通过`setViewer`参数传递的函数得到当前 react-pannellum 的实例

### 监听事件与消除事件

```js
const [reactPannellum, setReactPannellum] = useState(null)

useEffect(() => {
    if (!reactPannellum) return
    const initLoad = () => {}
    reactPannellum.on('load', initLoad)
    return () => {
        reactPannellum.off('load', initLoad)
    }
}, [reactPannellum])

<Pannellum
    setViewer={setReactPannellum}
    ...
/>
```

通过`on`监听事件，相当于于`addEventListener`，通过`off`消除监听事件，相当于`removeEventListener`

### 所有的事件

### `load`

当全景图完成加载时触发，切换场景时，新场景也会触发该事件，并且能在该事件中通过`getScene()`方法拿到更新后的场景值 ID

### `scenechange`

切换场景时触发，但在改事件中`getScene()`拿到的场景值 ID 是当前场景 ID，不是切换之后的场景值 ID

### `zoomchange`

场景 hfov 更新时触发。将新的 HFOV 值传递给处理程序

### `fullscreenchange`

当浏览器全屏状态改变时触发。将状态值传递给处理程序。

### `scenechangefadedone`

如果指定了场景转换淡入淡出间隔，则在切换场景后淡入淡出完成时触发此事件

### `animatefinished`

当任何动作/动画完成时触发，即当渲染器停止渲染新帧时。将最终俯仰、偏航和 HFOV 值传递给处理程序。

### `error`

发生错误时触发。错误消息字符串被传递给事件侦听器。

### `errorcleared`

清除错误时触发

### `mousedown`

按下鼠标按钮时触发。传递`MouseEvent`给处理程序。

### `mouseup`

释放鼠标按钮时触发。传递`MouseEvent`给处理程序。

### `touchstart`

触摸开始时触发。传递`TouchEvent`给处理程序。

### `touchend`

触摸结束时触发。传递`TouchEvent`给处理程序。

## react-pannellum 实例的常用方法

### 解释一下`pitch` `yaw` `hfov`

这几个值代表了 VR 全景图的视角变化，在[参数文档表格]('https://doc.weixin.qq.com/sheet/e3_AeUArQY6ACwn0vBVpMtRu6ViWUHhb?scode=AJEAIQdfAAoye9vbi7AeUArQY6ACw&tab=BB08J2')中也有很多体现

- `pitch` 水平方向上下移动角度 正值向上 负值向下，上下旋转角度控制
- `yaw` 垂直方向左右旋转角度 正值向右 负值向左，左右旋转角度控制
- `hfov` 摄像机视角，即缩放角度大小控制，值越小越近，值越大越远，视角远近控制

一张图解释

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/853124bb165042b796d69afa9138c375~tplv-k3u1fbpfcp-watermark.image?)

> 建议去多试试这几个值，就能明白什么意思了

### 所有方法

### isLoaded()

检查全景图是否加载完成。如果加载完成了，则返回`true`，否则返回 `false`

### getPitch()

返回当前场景的 pitch 值

### setPitch(pitch, animated, callback)

设置当前场景的 pitch 值

- `pitch` pitch 值，数据类型为`number`
- `animated` 动画持续时间（以毫秒为单位）或 false 表示没有动画（可选，默认`1000`）
- `callback` 动画结束时调用的函数

### getPitchBounds()

返回允许的最小和最大 pitch 返回值为一个数组`Array[minPitch, maxPitch]`

### setPitchBounds(bounds)

设置最小和最大 pitch `bounds`为一个数组`Array[minPitch, maxPitch]`

### getYaw()

### setYaw(yaw, animated, callback)

### getYawBounds()

### setYawBounds(bounds)

### getHfov()

### setHfov(hfov, animated, callback)

### getHfovBounds()

### setHfovBounds(bounds)

> 这几个方法同上面方法一样，不过是获取和设置`pitch`，`yaw`，`hfov`这三个不同的值

### getNorthOffset

返回全景图的北偏移

### getRenderer()

获取全景渲染器

### setUpdate()

为动态内容设置更新

### lookAt(pitch, yaw, hfov, animated, callback)

设置全景图新的查看角度，包含了`pitch`，`yaw`，`hfov`三个值

### startAutoRotate(speed)

开启自动旋转，`speed`自动旋转速度

### stopAutoRotate()

关闭自动旋转

### stopMovement()

停止所有运动

### loadScene(sceneId, pitch, yaw, hfov)

加载不同的场景

- `sceneId` 加载场景的 sceneId 值
- `pitch` 场景加载好的初始 pitch 值，
- `yaw` 场景加载好初始 yaw 值
- `hfov` 场景加载好初始 hfov 值

### getScene()

返回当前当前场景值 ID

### addScene(sceneId, config)

添加新的场景，需要重新配置 config

### removeScene(sceneId)

移除场景

### toggleFullscreen()

切换全屏操作

### getConfig()

返回当前场景配置的 config

### getContainer()

返回实例容器的 dom 元素

### addHotSpot(hs, sceneId)

在场景中添加热点信息

- `hs` 热点配置项，[参数文档表格]('https://doc.weixin.qq.com/sheet/e3_AeUArQY6ACwn0vBVpMtRu6ViWUHhb?scode=AJEAIQdfAAoye9vbi7AeUArQY6ACw&tab=BB08J2')中有具体配置解释
- `sceneId` 需要添加热点的场景 ID 值

### removeHotSpot(hotSpotId, sceneId)

在场景中移除热点信息

- `hotSpotId` 需要被移除热点的 id 值
- `sceneId` 需要被移除热点的场景 ID 值

### resize()

如果改变了实例容器的大小，则调用此方法

### isOrientationSupported()

检查是否支持设备方向控制，是返回`true`，否返回`false` 即控制手机方向会控制全景图位置

### stopOrientation()

停止设备控制方向

### startOrientation()

开始设备控制方向

### isOrientationActive

返回当前是否激活了设备控制方向

### on

监听实例的事件，相当于`addEventListener`

### off

关闭监听实例的事件，相当于`removeEventListener`

### destory()

销毁实例

# 结束语

这可以当作一个 VR 全景图的简单文档，核心还是使用 pannellum 插件实现，我不过是把这些配置项和方法重新封装了一遍，让你可以不去阅读更多的内容，能够快速的实现一个全景图, 如果觉得帮助到你了，[点个赞给个星吧](https://github.com/zuiaiwanqian/vr-react)，最后的最后，如果你觉得该组件满足不了你的需求，可以自己去使用原生的[pannellum](https://pannellum.org/)实现
