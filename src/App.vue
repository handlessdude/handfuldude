<script setup lang="ts">
import MyCamera from "@/components/MyCamera.vue";

//handPoseDetection
import * as hdp from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";
import { attempt } from "@/utils/execControl";
import {
  extractKeypoint,
  normalizedCoordsInPerc,
  //multiplyValue,
} from "@/utils/handsPostProcessing";

import { onMounted, onUnmounted, ref } from "vue";
// stucked into the issue of max webcam resolution maybe? todo check out webcam proportions
/*
const QUOTIENT = 0.75;
const _width = ref(multiplyValue(window.innerWidth, QUOTIENT));
const _height = ref(multiplyValue(window.innerHeight, QUOTIENT));
const onResize = () => {
  _width.value = multiplyValue(window.innerWidth, QUOTIENT);
  _height.value = multiplyValue(window.innerHeight, QUOTIENT);
  console.log("new _width = ", _width.value, "new _height = ", _height.value);
};
*/
const _width = ref(640);
const _height = ref(480);

const target = ref<HTMLDivElement>();
const camRef = ref<{ video: HTMLVideoElement }>();
let detector: hdp.HandDetector;

const GE = new fp.GestureEstimator([
  fp.Gestures.VictoryGesture,
  fp.Gestures.ThumbsUpGesture,
]);

function predictWebcam() {
  detector
    .estimateHands(camRef.value?.video as HTMLVideoElement)
    .then(function (predictions) {
      if (predictions.length) {
        const hand = predictions[0];
        // let estimatedGestures;
        // try {
        //   estimatedGestures = GE.estimate(
        //     hand.keypoints3D?.map((item) => [item.x, item.y, item.z]),
        //     8.5
        //   );
        //   console.log(estimatedGestures);
        // } catch (error) {
        //   console.log("wrong api!!!", error);
        // }

        const indexFingerTip = extractKeypoint(hand, "index_finger_tip");
        const coords = normalizedCoordsInPerc(
          indexFingerTip,
          _width.value,
          _height.value
        );
        //console.log("normalizedCoords = ", coords);
        if (target.value) {
          (target.value as HTMLDivElement).style.left = coords.x + "%";
          (target.value as HTMLDivElement).style.top = coords.y + "%";
          const estimatedGestures = GE.estimate(
            hand.keypoints3D?.map((item) => [item.x, item.y, item.z]),
            8.5
          );
          if (
            estimatedGestures.gestures.find(
              (item: { name: string; score: number }) =>
                item.name === "thumbs_up"
            )
          ) {
            const x = target.value.offsetLeft;
            const y = target.value.offsetTop;
            const elem = document.elementFromPoint(x, y);
            (elem as HTMLElement).click();
            console.log(x, y, elem);
            //сюда должен идти экшен редьюсер))
          }
        }
      }
      window.requestAnimationFrame(predictWebcam);
    });
}

const showCamera = ref(true);
const showTarget = ref(false);

const toggleTarget = () => {
  showTarget.value = !showTarget.value;
};

onMounted(async () => {
  //window.addEventListener("resize", onResize);

  const model = hdp.SupportedModels.MediaPipeHands;
  const detectorConfig: hdp.MediaPipeHandsMediaPipeModelConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full",
  };

  detector = await attempt(
    async () => /*await*/ hdp.createDetector(model, detectorConfig),
    () => {
      console.log("Model loaded");
      (camRef.value?.video as HTMLVideoElement).addEventListener(
        "loadeddata",
        predictWebcam
      );
      toggleTarget();
    },
    () => console.log("Failed to Load Model")
  );
  console.log("DBG: detector = ", detector, typeof detector);
});
onUnmounted(() => {
  //window.removeEventListener("resize", onResize);
  (camRef.value?.video as HTMLVideoElement).removeEventListener(
    "loadeddata",
    predictWebcam
  );
});
const greet = () => alert("heloo");
</script>

<template>
  <main class="main">
    <h1 @click="greet">W E B C A M</h1>
    <MyCamera
      v-if="showCamera"
      :width="_width"
      :height="_height"
      ref="camRef"
    />
  </main>
  <div class="target" id="target" ref="target" v-if="showTarget"></div>
  <!--
    <div class="target" id="leftTarget" ref="leftTarget" v-if="showTarget"></div>
    <div class="target" id="rightTarget" ref="rightTarget" v-if="showTarget"></div> 
  -->
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/scrollbar.css";
@import "@/assets/containers.scss";

body,
#app {
  height: 100vh;
  width: 100vw;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.target {
  position: absolute;
  top: 50%;
  right: 50%;
  border-radius: 50%;
  border: 2px dashed white;
  background-color: hsla(160, 100%, 37%, 1);
  width: 1.2rem;
  height: 1.2rem;
  z-index: 10;
  transition: 0.4s;
}

//просто красивые цвета
//hsla(160, 100%, 37%, 1);
//hsla(160, 100%, 37%, 0.2);

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
</style>
