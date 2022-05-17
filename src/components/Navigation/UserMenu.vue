<script setup lang="ts">
import MenuLink from "@/components/Navigation/MenuLink.vue";
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
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
  "/page1": {
    name: "Page 1",
    icon: "fas fa-chart-bar",
  },
  "/page2": {
    name: "Page 2",
    icon: "fas fa-chart-bar",
  },
  "/page3": {
    name: "Page 3",
    icon: "fas fa-chart-bar",
  },
  "/page4": {
    name: "Page 4",
    icon: "fas fa-chart-bar",
  },
  "/page5": {
    name: "Page 5",
    icon: "fas fa-chart-bar",
  },
  "/page6": {
    name: "Page 6",
    icon: "fas fa-chart-bar",
  },
};
</script>

<template>
  <transition name="menu-animation">
    <div v-if="props.showMenu" @click.self="props.toggleMenu" class="menu">
      <transition name="menu-animation-inner">
        <div v-if="props.showMenu" class="menu-inner">
          <div class="toggle" @click.self="toggleMenu">
            <h1 class="header--gesture">
              <i class="fa-solid fa-circle-plus"></i>
            </h1>
          </div>
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

<style lang="scss">
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: var(--menu-size);
    height: var(--menu-size);
    border-radius: var(--menu-icon-border-radius);
    color: var(--dark-gray);
    // background: #fff;
    // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    //   0 2px 4px -1px rgba(0, 0, 0, 0.06);

    position: relative;
    z-index: 1000;

    .toggle {
      position: absolute;
      width: var(--menu-icon-size);
      height: var(--menu-icon-size);
      border-radius: var(--menu-icon-border-radius);
      background-color: white;

      z-index: 1000;
      cursor: pointer;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
      font-size: 2em;
      transition: 1.25s;
      display: flex;
      justify-content: center;
      align-items: center;

      * {
        margin: 0;
      }

      transition: 0.5s;
      animation: myrotate 1s 1; /* Указываем название анимации, её время и количество повторов*/
      animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
    }
  }
  @keyframes myrotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(315deg);
    }
  }
  /*НЕ ТРОГАТЬ*/
  .link {
    position: absolute;
    left: 0;
    list-style: none;
    .a-content {
      transform: rotate(calc(360deg / -8 * var(--i)));
    }

    transform-origin: calc(var(--menu-size) / 2);
    transform: rotate(0deg)
      translateX(calc((var(--menu-size) - var(--menu-icon-size)) / 2));
    transition: 0.5s;
    animation: mymove 0.3s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
    animation-delay: calc(0.1s * var(--i)); /* Задержка перед началом */
  }
  @keyframes mymove {
    from {
      transform: rotate(0deg)
        translateX(calc((var(--menu-size) - var(--menu-icon-size)) / 2));
    }
    to {
      transform: rotate(calc(360deg / 8 * var(--i)));
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
