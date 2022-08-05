import React, { useEffect, useRef, useState } from "react";

export default function Pannellum(props) {
  const {
    config = {},
    scenes = {},
    width,
    height,
    firstSceneId = "",
    setViewer,
    hotSpots = [],
    delayTime = 0,
  } = props;

  const [cViewer, setCViewer] = useState(null);

  const lastSceneId = useRef("");

  const hots = useRef([]);
  const numRef = useRef(0);

  useEffect(() => {
    hots.current = hotSpots.map((hot) => {
      const newHot = { ...hot };
      newHot.type = "info";
      if (!Array.isArray(newHot.cssClass)) {
        newHot.cssClass = [];
      }
      if (!newHot.id) {
        const randomId = Math.random().toString(36).slice(-6);
        newHot.id = randomId;
      }
      newHot.cssClass = newHot.cssClass.join(" ");
      return newHot;
    });
  }, [hotSpots]);

  useEffect(() => {
    initSource().then(() => {
      if (numRef.current === 1) return;
      numRef.current += 1;
      initViewer();
    });
  }, []);

  useEffect(() => {
    if (!cViewer) return;
    // 初始化init热点
    initHot();
    cViewer.on("load", initHot);
    return () => {
      cViewer.off("load", initHot);
    };
  }, [cViewer]);

  const initViewer = () => {
    let firstScene = firstSceneId;
    if (!firstScene) {
      firstScene = Object.keys(scenes)[0] || "";
    }
    const initConfig = {
      firstScene, // 第一个场景值id
      orientationOnByDefault: false, // 如果设置为true，则在加载全景图时将使用设备方向控制（如果设备支持）。如果为 false，则需要通过按下按钮来激活设备方向控制。默认为false
      autoLoad: true, // 是否自动加载
      autoRotate: 2, // 是否自动旋转
      autoRotateInactivityDelay: 2000, // 用户活动停止后多少秒开始自动旋转全景图
      fallback: "", // 如果设置，则在用户设备不支持 Pannellum 的情况下，该值将用作后备查看器的 URL
      friction: 0.15, // 惯性控制摩擦器 0.1 到 1 值越大停的越快 默认值0.15
      showFullscreenCtrl: true, // 是否显示全屏控件
      showZoomCtrl: true, // 是否显示缩放控件
      mouseZoom: true, // 如果设置为false，使用鼠标滚轮进行缩放将被禁用 默认为true
      draggable: true, // 如果设置为false，则禁用鼠标和触摸拖动 默认为true
      disableKeyboardCtrl: false, // 如果设置为true，则禁用键盘控制。默认为false 可使用键盘控制旋转缩放
      touchPanSpeedCoeffFactor: 1, // 触摸时平移速度 默认1 值越大滑动越快
      yaw: -10, // 初始垂直方向左右旋转角度 正值向右 负值向左，左右旋转角度控制
      minYaw: -180, // 垂直方向最小旋转角度 默认-180
      maxYaw: 180, // 垂直方向最大旋转角度 默认180
      pitch: 0, // 初始水平方向上下移动角度 正值向上 负值向下，上下旋转角度控制
      minPitch: -180, // 水平方向最小移动角度 默认 -180
      maxPitch: 180, // 水平方向最大移动角度 默认 180
      hfov: 100, // 初始摄像机视角，即缩放角度大小控制，太大会导致拉伸效果，默认为100
      minHfov: 50, // 摄像机最小视角，默认50，
      maxHfov: 120, // 摄像机最大视角 如果最大视角小于初始视角，初始视角值为最大视角值，默认120
      compass: true, // true显示指南针控件 默认false
      northOffset: 0, // 设置全景图中心与北的偏移量，影响指南针初始角度，只有在compass为true时有效果
      preview: "", // 指定要在加载全景图之前显示的预览图像的 URL
      horizonPitch: 0, // 指定图像水平的俯仰 用于校正非水平全景图 默认为0
      horizonRoll: 0, // 指定图像水平的滚动 用于校正非水平全景图 默认为0
      escapeHTML: true, // HTML 将从配置字符串中转义，以帮助缓解可能的 DOM XSS 攻击， 默认为false。
      crossOrigin: "anonymous", // 使用的 CORS 请求类型，可以设置为 anonymous或use-credentials。默认为anonymous.
      sceneFadeDuration: 1000, // 指定在场景之间转换时的淡入淡出持续时间，以毫秒为单位, 默认为1000
      hotSpotDebug: false, // 为true时，单击鼠标按钮时，鼠标指针的俯仰和偏航记录到控制台。默认为false
      backgroundColor: [0, 0, 0], // 指定一个包含 RGB 值 [0, 1] 的数组，该数组为没有可用图像数据的区域设置背景颜色, 默认为[0, 0, 0]
      avoidShowingBackground: false, // 如果设置为true，则通过约束偏航角和视野来防止显示部分全景的超出范围的区域。即使在画布的角落和边缘，也只会显示实际属于图像的区域 因此backgroundColor如果设置了此选项，则不需要设置该选项。默认为false
      ...config,
    };
    const initViewer = window.pannellum.viewer("panorama", {
      default: initConfig,
      scenes,
    });
    if (setViewer) {
      setViewer(initViewer);
    }
    setCViewer(initViewer);
  };

  function initHot() {
    const currentSceneId = cViewer.getScene();
    hots.current.forEach((hot) => {
      if (hot.sId === lastSceneId.current) {
        cViewer.removeHotSpot(hot.id, hot.sId);
      }
      if (hot.sId === currentSceneId) {
        const timer = setTimeout(() => {
          cViewer.addHotSpot(hot, hot.sId);
          clearTimeout(timer);
        }, delayTime);
      }
    });
    lastSceneId.current = currentSceneId;
  }

  return (
    <div id="panorama" className="panorama" style={{ width, height }}></div>
  );
}

const initSource = () => {
  loadStyles(
    "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
  );
  const pannellumCss = `
  .panorama {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .pnlm-about-msg {
    display: none !important;
  }
  .pnlm-load-box {
    display: none !important;
  }
  .pnlm-container {
    background: transparent !important;
  }
  .pnlm-hotspot:hover {
    background-color: transparent !important;
  }
  .pnlm-pointer {
    cursor: default !important;
  }
  `;
  loadStyleString(pannellumCss);
  const resolve = loadScript(
    "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
  );
  return resolve;
};

function loadStyles(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

function loadScript(url) {
  const promise = new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
    script.onload = (e) => {
      resolve("success");
    };
  });
  return promise;
}

function loadStyleString(css) {
  var style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.textContent = css;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
