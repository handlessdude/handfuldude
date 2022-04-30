<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
  }>(),
  {
    width: 640,
    height: 480,
  }
);

const constraints = {
  video: true,
};

const video = ref<HTMLVideoElement>();
const enableCam = () => {
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    (video.value as HTMLVideoElement).srcObject = stream;
  });
};

defineExpose({
  video,
});
</script>

<template>
  <div id="liveView" class="camView">
    <button id="webcamButton" @click="enableCam">Enable Webcam</button>
    <video id="webcam" ref="video" autoplay muted :width="width" :height="height"></video>
  </div>
</template>

<style scoped></style>
