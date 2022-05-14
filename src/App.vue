<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import MyCamera from "@/components/MyCamera.vue";
import ModalWindow from "@/components/ModalWindow.vue";

//handPoseDetection
import * as hdp from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";

import { attempt } from "@/utils/execControl";
import {
  extractKeypoint,
  normalizedCoordsInPerc,
} from "@/utils/handPostProcessing";

import {
  extractMaxScoreGesture,
  gestureReducer,
} from "@/utils/gesturePostProcessing";

import MyGestures from "@/utils/gestureDefinitions";

const _width = ref(640);
const _height = ref(480);

const target = ref<HTMLDivElement>();
const camRef = ref<{ video: HTMLVideoElement }>();

//hand estimation
let detector: hdp.HandDetector;

const GE = new fp.GestureEstimator([
  fp.Gestures.VictoryGesture,
  fp.Gestures.ThumbsUpGesture,
  MyGestures.freeHandGesture,
  MyGestures.thumbsDownGesture,
]);

function predictWebcam() {
  detector
    .estimateHands(camRef.value?.video as HTMLVideoElement)
    .then(function (predictions) {
      if (predictions.length) {
        const hand = predictions[0];
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
          if (estimatedGestures.gestures.length) {
            console.log(estimatedGestures.gestures);
            const gesture = extractMaxScoreGesture(estimatedGestures.gestures);

            const x = target.value.offsetLeft;
            const y = target.value.offsetTop;
            const elem = document.elementFromPoint(x, y);
            if (gesture && elem) {
              const e = gestureReducer(gesture);
              console.log(`firing action on element!`, e, elem);
              e && elem.dispatchEvent(e);
            }
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

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

onMounted(async () => {
  //window.addEventListener("resize", onResize);
  console.log(showModal);
  const model = hdp.SupportedModels.MediaPipeHands;
  const detectorConfig: hdp.MediaPipeHandsMediaPipeModelConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full",
  };

  detector = await attempt(
    async () => await hdp.createDetector(model, detectorConfig),
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
    <h1 @click="toggleModal">W E B C A M</h1>
    <MyCamera
      v-if="showCamera"
      :width="_width"
      :height="_height"
      ref="camRef"
    />
  </main>
  <div class="target" id="target" ref="target" v-if="showTarget"></div>
  <ModalWindow v-bind="{ toggleModal, showModal }">
    <div class="modal-content">
      <h1>This is a Modal Header. Told YA!</h1>
      <p>This is a modal message</p>
    </div>
  </ModalWindow>
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
