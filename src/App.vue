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
import NavHeader from "./components/Navigation/NavHeader.vue";
/*
  gesture controls logic import
*/
import * as fp from "fingerpose";
import { useGestureControls } from "@/hooks/useGestureControls";
import { useGestureIcon } from "@/hooks/useGestureIcon";
import { useTargetStyle } from "./hooks/useTargetStyle";
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
} = useGestureControls(gestures, { width: 1280, height: 720 });

/* for indicating which gesture is currently active */
const { gestureIconClass } = useGestureIcon(currentGesture);
const { targetClass } = useTargetStyle(currentGesture);

/* modal window controlling */
// const showModal = ref(false);
// const toggleModal = () => {
//   showModal.value = !showModal.value;
// };

/* setting up the environment */
onMounted(async () => {
  await initDetector();
});
onUnmounted(() => {
  clearDetector();
});
</script>

<template>
  <NavHeader v-bind="{ gestureIconClass, camRef }" />
  <main class="main">
    <WebCamera v-if="showCamera" ref="camRef" v-bind="{ width, height }" />

    <router-view v-slot="{ Component }">
      <transition name="router-anim">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
  <div
    v-if="showTarget"
    ref="target"
    :class="`target ${targetClass}`"
    id="target"
  ></div>

  <!-- <ModalWindow v-bind="{ toggleModal, showModal }">
    <div class="modal-content">
      <h1>Seems like gesture classifier does its job</h1>
    </div>
  </ModalWindow> -->
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/scrollbar.css";
@import "@/assets/containers.scss";

#app {
  width: 100%;
  height: 100%;
  position: relative;
}
#webcam {
  position: absolute;
  top: var(--header-height);
  right: 0;
}
.target {
  position: absolute;
  top: 50%;
  right: 50%;
  border-radius: 50%;
  border: 2px dashed white;
  width: 2rem;
  height: 2rem;
  z-index: 1000;
  //transition: background-color 1s, top 0.4s, right 0.4s;
  transition: 0.4s;
}
.target-filled {
  background-color: hsla(160, 100%, 37%, 1);
}
//просто красивые цвета
//hsla(160, 100%, 37%, 1);
//hsla(160, 100%, 37%, 0.2);
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}

/*DO NOT TOUCH*/
.router-anim-enter-active {
  animation: coming 1s;
  animation-delay: 1s;
  opacity: 0;
}
@keyframes coming {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.router-anim-leave-active {
  animation: going 1s;
}
@keyframes going {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50%);
    opacity: 0;
  }
}
</style>
