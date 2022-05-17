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
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  user-select: none;
  padding: 0.4em;
  border-radius: var(--menu-icon-border-radius);
  color: white;
  text-decoration: none;
  width: var(--menu-icon-size);
  height: var(--menu-icon-size);
  background-color: crimson;
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
