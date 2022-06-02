<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  to: string;
  icon: string;
}>();
const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <div class="a-content">
      <i class="icon" :class="icon" />
      <transition name="fade">
        <div>
          <slot />
        </div>
      </transition>
    </div>
  </router-link>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.link {
  cursor: pointer;
  font-weight: 400;
  user-select: none;
  padding: 0.4em;
  border-radius: var(--menu-icon-border-radius);
  color: var(--gray);
  text-decoration: none;
  width: var(--menu-icon-size);
  height: var(--menu-icon-size);
  background-color: var(--greeny);
  //box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
}
.a-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link:hover {
  background-color: var(--sidebar-item-hover);
}
.link.active {
  background-color: var(--sidebar-item-active);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
