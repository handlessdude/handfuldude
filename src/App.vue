<script setup lang="ts">
import Camera from "@/components/Camera.vue";

//handPoseDetection
import * as hdp from "@tensorflow-models/hand-pose-detection";
import { attempt } from "@/utils/execControl";
import {
  extractHanded,
  extractKeypoint,
  normalizedCoordsInPerc,
} from "@/utils/handsPostProcessing";

import { onMounted, ref } from "vue";

//const windowWidth = ref(window.innerWidth);
//const windowHeight = ref(window.innerHeight);

const target = ref<HTMLDivElement>();
//const leftTarget = ref<HTMLDivElement>();
// const rightTarget = ref<HTMLDivElement>();

const camRef = ref<{ video: HTMLVideoElement }>();
let detector: hdp.HandDetector;
function predictWebcam() {
  detector
    .estimateHands(camRef.value?.video as HTMLVideoElement)
    .then(function (predictions) {
      if (predictions.length) {
        const hand = predictions[0];
        const indexFingerTip = extractKeypoint(hand, "index_finger_tip");
        const coords = normalizedCoordsInPerc(
          indexFingerTip,
          window.innerWidth,
          window.innerHeight
        );
        console.log("normalizedCoords = ", coords);
        if (target) {
          (target.value as HTMLDivElement).style.left = coords.x + "%";
          (target.value as HTMLDivElement).style.top = coords.y + "%";
        }

        // here we have a problem: hand's handedness may be misrecognized so left and right targets may swap...
        // and we dont want that for decent user experience
        /*
        const leftHand = extractHanded(predictions, "Left");
        const rightHand = extractHanded(predictions, "Right");
        if (leftHand) {
          //console.log("DBG: LEFT_HAND = ", leftHand);
          //console.log("DBG: LEFT_INDEX_FINGER = ", leftIndexFinger);
          const leftIndexFinger = extractKeypoint(leftHand, "index_finger_tip");
          const coordsLeft = normalizedCoordsInPerc(leftIndexFinger, 640, 480);
          console.log("normalizedCoordsInPerc LEFT = ", coordsLeft);
          if (rightTarget) {
            (rightTarget.value as HTMLDivElement).style.left = coordsLeft.x + "%";
            (rightTarget.value as HTMLDivElement).style.top = coordsLeft.y + "%";
          }
        }
        if (rightHand) {
          //console.log("DBG: RIGHT_HAND = ", rightHand);
          //console.log("DBG: RIGHT_INDEX_FINGER = ", rightIndexFinger);
          const rightIndexFinger = extractKeypoint(rightHand, "index_finger_tip");
          const coordsRight = normalizedCoordsInPerc(rightIndexFinger, 640, 480);
          console.log("normalizedCoordsInPerc RIGHT = ", coordsRight);
          if (leftTarget) {
            (leftTarget.value as HTMLDivElement).style.left = coordsRight.x + "%";
            (leftTarget.value as HTMLDivElement).style.top = coordsRight.y + "%";
          }
        }
        */
      }

      window.requestAnimationFrame(predictWebcam);
    });
}

const showCamera = ref(true);
const showTarget = ref(false);

const toggleCamera = () => {
  showCamera.value = !showCamera.value;
};

const toggleTarget = () => {
  showTarget.value = !showTarget.value;
};

onMounted(async () => {
  const model = hdp.SupportedModels.MediaPipeHands;
  const detectorConfig: hdp.MediaPipeHandsMediaPipeModelConfig = {
    runtime: "mediapipe", // or 'tfjs'
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full",
  };

  detector = await attempt(
    async () => /*await*/ hdp.createDetector(model, detectorConfig),
    () => {
      console.log("Model loaded");
      (camRef.value?.video as HTMLVideoElement).addEventListener(
        "loadeddata",
        predictWebcam //as (this: HTMLVideoElement, ev: Event) => any
      );
      toggleTarget();
    },
    () => console.log("Failed to Load Model")
  );
  console.log("DBG: detector = ", detector, typeof detector);
});
</script>

<template>
  <main class="main">
    <h1>W E B C A M</h1>
    <Camera v-if="showCamera" :width="640" :height="480" ref="camRef" />
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
