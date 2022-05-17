<script setup lang="ts">
import { ref } from "vue";
import UserMenu from "@/components/Navigation/UserMenu.vue";

const props = defineProps<{
  gestureIconClass: string;
  camRef?: {
    video: HTMLVideoElement;
    isEnabled: boolean;
    toggleCam: () => void;
  };
}>();
const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);
</script>

<template>
  <div class="navigation">
    <header class="header">
      <div class="controls">
        <h1 class="header--title">Handfuldude</h1>
        <button
          id="webcamButton"
          @click="camRef?.toggleCam"
          :disabled="camRef?.isEnabled"
          class="btn"
        >
          Enable Webcam
        </button>
      </div>

      <h1 class="header--gesture">
        <i :class="[props.gestureIconClass]"></i>
      </h1>
    </header>

    <transition name="slide">
      <div class="tab" @click="toggleMenu" v-if="!showMenu">
        <i class="fa-solid fa-angles-down"></i>
      </div>
    </transition>

    <UserMenu v-bind="{ showMenu, toggleMenu }" />
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  //z-index: 998;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header {
  z-index: 1000;
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
  width: 100%;
}

.header--image {
  height: 100%;
  margin-right: 6px;
}

.header--title {
  font-size: 1.5rem;
  //margin-right: auto;
}
.controls {
  margin-right: auto;
  display: flex;
  align-items: center;
  .btn {
    margin-left: 1rem;
    height: 50%;
  }
}

.tab {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: var(--header-height);
  width: var(--menu-btn-width);
  height: var(--menu-btn-height);
  background-color: #fff;
  color: var(--dark-gray);
  z-index: 999;
  /* Only round the top corners */
  -webkit-border-bottom-left-radius: 15px;
  -webkit-border-bottom-right-radius: 15px;
  -moz-border-radius-bottomleft: 15px;
  -moz-border-radius-bottomright: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  i {
    z-index: 999;
  }
}
.tab:hover {
  cursor: pointer;
}
.tab:before,
.tab:after {
  position: absolute;
  top: -1px;
  width: 20px;
  height: 20px;
  content: " ";
}
.tab:before {
  left: -20px;
  border-top-right-radius: 15px;
  border-width: 0 1px 1px 0;
  box-shadow: 5px -5px 0 #fff;
}
.tab:after {
  right: -20px;
  border-top-left-radius: 15px;
  border-width: 0 0 1px 1px;
  box-shadow: -5px -5px 0 #fff;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(calc(-1 * var(--menu-btn-height)));
}
</style>
