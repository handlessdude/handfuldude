<script setup lang="ts">
import Camera from "@/components/Camera.vue";

import { ref } from "vue";

const showCamera = ref(true);
const toggleCamera = () => (showCamera.value = !showCamera.value);
</script>

<template>
  <main class="main">
    <h1>W E B C A M</h1>
    <Camera v-if="showCamera" :width="640" :height="480" />
  </main>
  <!-- <RouterView /> -->
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/scrollbar.css";

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
