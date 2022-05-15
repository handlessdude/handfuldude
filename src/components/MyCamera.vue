<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
    //callback?: Function;
  }>(),
  {
    width: 640,
    height: 480,
  }
);

const constraints = {
  video: true,
};
const isEnabled = ref(false);
const video = ref<HTMLVideoElement>();
const toggleCam = () => {
  if (!isEnabled.value) {
    isEnabled.value = true;
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      (video.value as HTMLVideoElement).srcObject = stream;
      console.log("DBG: Webcam stream is captured!");
      // это работает!
      // console.log(props.callback);
      // if (props.callback) {
      //   (video.value as HTMLVideoElement).addEventListener(
      //     "loadeddata",
      //     props.callback as (this: HTMLVideoElement, ev: Event) => any
      //   );
      // }
    });
  } else {
    console.log("Cam is already enabled.");
  }
};
defineExpose({
  video,
});
</script>

<template>
  <div id="camView">
    <button
      id="webcamButton"
      @click="toggleCam"
      :disabled="isEnabled"
      class="btn"
    >
      Enable Webcam
    </button>
    <video
      id="webcam"
      ref="video"
      autoplay
      muted
      :width="width"
      :height="height"
    ></video>
  </div>
</template>

<style scoped>
#camView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#camView > video {
  margin-top: 2rem;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
