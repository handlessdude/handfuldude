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
import { useGestureIcon } from "@/hooks/useGestureIcon";
import MyGestures from "@/utils/gestureDefinitions";
/* initializing controls logic*/
const gestures = [
  fp.Gestures.ThumbsUpGesture,
  MyGestures.freeHandGesture,
  MyGestures.thumbsDownGesture,
  MyGestures.pointGesture,
];
const {
  width,
  height,

  target,
  showTarget,
  toggleTarget,

  camRef,
  showCamera,

  currentGesture,

  initDetector,
  clearDetector,
} = useGestureControls(gestures);

/* modal window controlling */
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

/* for indicating which gesture is currently active */
const { solidClass, gestureIcon } = useGestureIcon(currentGesture);

/* setting up the environment */
onMounted(async () => {
  await initDetector();
});
onUnmounted(() => {
  clearDetector();
});
</script>

<template>
  <header class="header" @click="toggleModal">
    <h1 class="header--title">Handfuldude</h1>
    <h1 class="header--gesture"><i :class="[gestureIcon, solidClass]"></i></h1>
  </header>
  <main class="main">
    <WebCamera v-if="showCamera" ref="camRef" v-bind="{ width, height }" />
  </main>
  <div v-if="showTarget" ref="target" class="target" id="target"></div>
  <ModalWindow v-bind="{ toggleModal, showModal }">
    <div class="modal-content">
      <h1>Seems like gesture classifier does its job</h1>
    </div>
  </ModalWindow>
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
.header {
  display: flex;
  align-items: center;
  height: 5rem;
  background: linear-gradient(
    90deg,
    var(--emerald) 1.18%,
    var(--light-emerald) 100%
  );
  color: white;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
}

.header--image {
  height: 100%;
  margin-right: 6px;
}

.header--title {
  font-size: 1.5rem;
  margin-right: auto;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}
</style>
