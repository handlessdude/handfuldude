import { ref } from "vue";
import { attempt } from "@/utils/execControl";

import * as hdp from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";

import {
  extractKeypoint,
  normalizedCoordsInPerc,
} from "@/utils/handPostProcessing";

import {
  extractMaxScoreGesture,
  gestureReducer,
} from "@/utils/gesturePostProcessing";
/**
 * contains features for gesture recognition using webcam
 */
export function useGestureControls(
  gestures: Array<any>, //WELL SORRY BUT THE FINGERPOSE LIB APPEARED TO HAVE NO TYPES
  config = {
    width: 640,
    height: 480,
  }
) {
  /* necessary for coordinates normalization */
  const width = ref(config.width);
  const height = ref(config.height);

  /* controllable cursor */
  const target = ref<HTMLDivElement>();
  const showTarget = ref(false);
  const toggleTarget = () => {
    showTarget.value = !showTarget.value;
  };

  /* camera which image we will be using */
  const camRef = ref<{ video: HTMLVideoElement }>();
  const showCamera = ref(true);

  /* hand detector */
  let detector: hdp.HandDetector;
  /* estimator of hand gestures */
  const gestureEstimator = new fp.GestureEstimator(gestures);

  async function initDetector() {
    const model = hdp.SupportedModels.MediaPipeHands;

    const detectorConfig: hdp.MediaPipeHandsMediaPipeModelConfig = {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
      modelType: "full",
    };

    detector = await attempt(
      async () => await hdp.createDetector(model, detectorConfig),
      () => {
        console.log("Model loaded");
        (camRef.value?.video as HTMLVideoElement).addEventListener(
          "loadeddata",
          predictWebcam
        );
        toggleTarget();
      },
      () => console.log("Failed to Load Model")
    );
  }

  function clearDetector() {
    (camRef.value?.video as HTMLVideoElement).removeEventListener(
      "loadeddata",
      predictWebcam
    );
  }

  function predictWebcam() {
    detector
      .estimateHands(camRef.value?.video as HTMLVideoElement)
      .then(function (predictions) {
        if (predictions.length) {
          const hand = predictions[0];
          const indexFingerTip = extractKeypoint(hand, 9); // extracting middle finger base
          const coords = normalizedCoordsInPerc(
            indexFingerTip,
            width.value,
            height.value
          );
          //console.log("normalizedCoords = ", coords);
          if (target.value) {
            (target.value as HTMLDivElement).style.left = coords.x + "%";
            (target.value as HTMLDivElement).style.top = coords.y + "%";
            const estimatedGestures = gestureEstimator.estimate(
              hand.keypoints3D?.map((item) => [item.x, item.y, item.z]),
              8.5
            );
            if (estimatedGestures.gestures.length) {
              console.log(estimatedGestures.gestures);
              const gesture = extractMaxScoreGesture(
                estimatedGestures.gestures
              );

              const x = target.value.offsetLeft;
              const y = target.value.offsetTop;
              const elem = document.elementFromPoint(x, y);
              if (gesture && elem) {
                const e = gestureReducer(gesture);
                console.log(`firing action on element!`, e, elem);
                e && elem.dispatchEvent(e);
              }
            }
          }
        }
        window.requestAnimationFrame(predictWebcam);
      });
  }

  return {
    width,
    height,

    target,
    showTarget,
    toggleTarget,

    camRef,
    showCamera,

    initDetector,
    clearDetector,

    predictWebcam,
  };
}
