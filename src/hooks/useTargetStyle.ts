import type { Ref } from "vue";
import { computed } from "vue";

/**
 * styles for gesture indicator
 */
/*well i dont like it but maybe ill find more exquisite solution to satisfy typescript later*/
export function useTargetStyle(
  currentGesture: Ref<{
    name: string;
    score: number;
  }>
) {
  const targetClass = computed(() => {
    return !(currentGesture.value.name === "") ? "target-filled" : "";
  });

  return { targetClass };
}
