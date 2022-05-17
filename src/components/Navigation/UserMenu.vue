<script setup lang="ts">
import MenuLink from "@/components/Navigation/MenuLink.vue";
const props = defineProps<{
  showMenu: boolean;
  toggleMenu: () => void;
  customClass?: string;
}>();

const MenuLinks = {
  "/": {
    name: "Home",
    icon: "fas fa-home",
  },
  "/about": {
    name: "About Page",
    icon: "fas fa-chart-bar",
  },
};
</script>

<template>
  <transition name="menu-animation">
    <div v-show="props.showMenu" @click.self="props.toggleMenu" class="menu">
      <transition name="menu-animation-inner">
        <div v-show="props.showMenu" class="menu-inner">
          <MenuLink
            v-for="(value, key, index) in MenuLinks"
            :style="`--i:${index}`"
            :to="key"
            :key="key"
            :icon="value.icon"
            @click="toggleMenu"
            >{{ value.name }}</MenuLink
          >
          <!-- <button @click="props.toggleMenu" type="button" class="btn">
            Close
          </button> -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.menu {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc (100vh - var(--header-height));
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.089);
  .menu-inner {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: var(--circle-border-radius);
    color: var(--dark-gray);
    position: relative;
    z-index: 1000;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background: #fff;
    padding: 1rem;
    .btn {
      padding: 20px 30px;
      border: none;
      background-color: crimson;
      cursor: pointer;
    }
  }
}
.menu-animation-enter-active,
.menu-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.menu-animation-enter-from,
.menu-animation-leave-to {
  opacity: 0;
}
.menu-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.menu-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.menu-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.menu-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>
