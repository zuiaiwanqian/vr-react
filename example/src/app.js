/*** examples/src/app.js ***/
import React from "react";
import ReactDOM from "react-dom/client";
import VrReact from "../../lib/index";
import { useState } from "react";
function App() {
  const config = {
    autoRotate: 0,
    hfov: 60,
    minHfov: 10,
    maxHfov: 60,
  };
  const scenes = {
    oneScene: {
      type: "cubemap",
      cubeMap: [
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_f.jpg?x-oss-process=style/nocut_compress",
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_r.jpg?x-oss-process=style/nocut_compress",
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_b.jpg?x-oss-process=style/nocut_compress",
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_l.jpg?x-oss-process=style/nocut_compress",
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_u.jpg?x-oss-process=style/nocut_compress",
        "https://krpano-pro.oss-accelerate.aliyuncs.com/static/resource/publish/krpano/1481085216446902274/quanjing/2205/40419783638860705/pano_d.jpg?x-oss-process=style/nocut_compress",
      ],
    },
    twoScene: {
      type: "cubemap",
      cubeMap: [
        "https://img.alicdn.com/imgextra/i4/O1CN014TNffn1nlaTfA98Fg_!!6000000005130-0-tps-1500-1500.jpg",
        "https://img.alicdn.com/imgextra/i3/O1CN01LsO1Bk20QbKpFTUQr_!!6000000006844-0-tps-1500-1500.jpg",
        "https://img.alicdn.com/imgextra/i1/O1CN01sS5m781ya6JgLSaVk_!!6000000006594-0-tps-1500-1500.jpg",
        "https://img.alicdn.com/imgextra/i3/O1CN01uTWCLc1XOCOuA92H0_!!6000000002913-0-tps-1500-1500.jpg",
        "https://img.alicdn.com/imgextra/i4/O1CN016lU3YJ1JdrJuFTcWt_!!6000000001052-0-tps-1500-1500.jpg",
        "https://img.alicdn.com/imgextra/i2/O1CN01nYe2Mn1ohkmBVyKpp_!!6000000005257-0-tps-1500-1500.jpg",
      ],
    },
    threeScene: {
      type: "equirectangular",
      panorama: "https://pannellum.org/images/bma-1.jpg",
    },
    fourScene: {
      type: "equirectangular",
      panorama: "https://pannellum.org/images/tocopilla.jpg",
    },
  };
  const hotSpots = [
    {
      pitch: -10, // ?????????????????????????????????
      yaw: 0, // ?????????????????????????????????
      clickHandlerFunc: () => {}, // ?????????????????????
      scale: true, // VR??????????????????????????????????????????????????????VR??????????????? ?????????false
      sId: "oneScene", // ?????????????????????????????????????????????
      text: "????????????Tooltip", // ????????????Tooltip??????????????????????????????????????????
    },
    {
      pitch: 20, // ????????????????????????????????????
      yaw: 0, // ????????????????????????????????????
      cssClass: ["campGate-hot"], // ?????????class?????????????????????, ??????????????????, ?????????????????????????????????????????????
      clickHandlerFunc: () => {
        viewer.loadScene("twoScene");
      }, // ?????????????????????
      sId: "oneScene", // ?????????????????????????????????????????????
    },
    {
      sId: "twoScene", // ?????????????????????????????????????????????
      cssClass: ["campGate-hot"],
      clickHandlerFunc: () => {
        viewer.loadScene("threeScene");
      },
    },
    {
      sId: "threeScene",
      cssClass: ["campGate-hot"],
      clickHandlerFunc: () => {
        viewer.loadScene("fourScene");
      },
    },
    {
      sId: "fourScene",
      cssClass: ["campGate-hot"],
      clickHandlerFunc: () => {
        viewer.loadScene("oneScene");
      },
    },
    {
      pitch: -20,
      yaw: 20,
      sId: "fourScene",
      text: "???????????????",
    },
  ];
  const [viewer, setViewer] = useState(null); // viewer?????????
  return (
    <div>
      <VrReact
        setViewer={setViewer}
        config={config}
        width="100%"
        height="100vh"
        firstSceneId="oneScene"
        scenes={scenes}
        hotSpots={hotSpots}
        delayTime={0}
      />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
