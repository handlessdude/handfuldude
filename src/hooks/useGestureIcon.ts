import type { Ref } from "vue";
import { ref, computed } from "vue";
import { GestureTypes } from "@/utils/gesturePostProcessing";

/**
 * styles for gesture indicator
 */
/*well i dont like it but maybe ill find more exquisite solution to satisfy typescript later*/
export function useGestureIcon(
  currentGesture: Ref<{
    name: string;
    score: number;
  }>
) {
  const gestureIcon = computed(() => {
    switch (currentGesture.value.name) {
      case GestureTypes.THUMBS_DOWN:
        return "fa-thumbs-down";
      case GestureTypes.THUMBS_UP:
        return "fa-thumbs-up";
      case GestureTypes.POINT:
        return "fa-hand-pointer";
      case GestureTypes.STOP:
        return "fa-hand";
      default:
        return "";
    }
  });
  const solidClass = ref("fa-solid");

  return { solidClass, gestureIcon };
}
