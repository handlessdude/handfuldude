<script setup lang="ts">
import Camera from "@/components/Camera.vue";

//handPoseDetection
import * as hdp from "@tensorflow-models/hand-pose-detection";
import { attempt } from "@/utils/execControl";
import { onMounted, ref, watchEffect } from "vue";

const camRef = ref<{ video: HTMLVideoElement }>();
function predictWebcam(/*detector: any*/) {
  console.log("HELLO HANDFULDUDE");
  //const hands = await detector.estimateHands(camRef.value?.video as HTMLVideoElement);
}

const showCamera = ref(true);
const toggleCamera = () => {
  showCamera.value = !showCamera.value;
};

onMounted(async () => {
  const model = hdp.SupportedModels.MediaPipeHands;
  const detectorConfig: hdp.MediaPipeHandsMediaPipeModelConfig = {
    runtime: "mediapipe", // or 'tfjs'
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    modelType: "full",
  };

  const detector = await attempt(
    async () => await hdp.createDetector(model, detectorConfig),
    () => {
      console.log("Model loaded");
      (camRef.value?.video as HTMLVideoElement).addEventListener(
        "loadeddata",
        predictWebcam
        //as (this: HTMLVideoElement, ev: Event) => any
      );
    },
    () => console.log("Failed to Load Model")
  );
  console.log(detector);
});
</script>

<template>
  <main class="main">
    <h1>W E B C A M</h1>
    <Camera v-if="showCamera" :width="640" :height="480" ref="camRef" />
  </main>
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/scrollbar.css";
@import "@/assets/containers.scss";

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
body,
#app {
  height: 100vh;
  width: 100vw;
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
