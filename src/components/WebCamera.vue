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

const isEnabled = ref(false);
const video = ref<HTMLVideoElement>();

const constraints = {
  audio: false,
  video: {
    width: { ideal: props.width },
    height: { ideal: props.height },
  },
};

const toggleCam = () => {
  if (!isEnabled.value) {
    isEnabled.value = true;
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      (video.value as HTMLVideoElement).srcObject = stream;
      console.log("DBG: Webcam stream is captured!");
    });
  } else {
    console.log("Cam is already enabled.");
  }
};
defineExpose({ isEnabled, video, toggleCam });
</script>

<template>
  <video
    id="webcam"
    ref="video"
    autoplay
    muted
    width="212"
    height="120"
  ></video>
</template>

<style scoped>
/* #camView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  border-bottom-right-radius: var(--round-borders-radius);
}
</style>
