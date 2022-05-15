<script setup lang="ts">
/*
  utils import
*/
import { onMounted, onUnmounted, ref } from "vue";
/* 
  components import
*/
import WebCamera from "@/components/WebCamera.vue";
import ModalWindow from "@/components/ModalWindow.vue";
/*
  gesture controls logic import
*/
import * as fp from "fingerpose";
import { useGestureControls } from "@/hooks/useGestureControls";
import MyGestures from "@/utils/gestureDefinitions";

/* initializing controls logic*/
const gestures = [
  fp.Gestures.VictoryGesture,
  fp.Gestures.ThumbsUpGesture,
  MyGestures.freeHandGesture,
  MyGestures.thumbsDownGesture,
];
const {
  width,
  height,

  target,
  showTarget,
  toggleTarget,

  camRef,
  showCamera,

  initDetector,
  clearDetector,
} = useGestureControls(gestures);

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

onMounted(async () => {
  await initDetector();
});
onUnmounted(() => {
  clearDetector();
});
</script>

<template>
  <main class="main">
    <h1 @click="toggleModal">W E B C A M</h1>
    <WebCamera v-if="showCamera" ref="camRef" v-bind="{ width, height }" />
  </main>
  <div v-if="showTarget" ref="target" class="target" id="target"></div>
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

#app {
  width: 100%;
  height: 100%;
}

.target {
  position: absolute;
  top: 50%;
  right: 50%;
  border-radius: 50%;
  border: 2px dashed white;
  background-color: hsla(160, 100%, 37%, 1);
  width: 2rem;
  height: 2rem;
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
  text-align: center;
}

h3 {
  font-size: 1.2rem;
}
</style>
