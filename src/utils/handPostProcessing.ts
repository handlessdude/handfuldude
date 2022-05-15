import type * as hdp from "@tensorflow-models/hand-pose-detection";

export function extractHanded(predictions: hdp.Hand[], handedness: string) {
  return predictions.find((hand) => hand.handedness === handedness);
}

/**
 *
 * @param hand
 * @param keypointIndex
   extracts one of the hand landmarks:
   0: wrist
   1: thumb_cmc
   2: thumb_mcp
   3: thumb_ip
   4: thumb_tip
   5: index_finger_mcp
   6: index_finger_pip
   7: index_finger_dip
   8: index_finger_tip
   9: middle_finger_mcp
   10: middle_finger_pip
   11: middle_finger_dip
   12: middle_finger_tip
   13: ring_finger_mcp
   14: ring_finger_pip
   15: ring_finger_dip
   16: ring_finger_tip
   17: pinky_finger_mcp
   18: pinky_finger_pip
   19: pinky_finger_dip
   20: pinky_finger_tip
 */
export function extractKeypoint(hand: hdp.Hand, keypointIndex: number) {
  //return hand.keypoints.find(keypoint => keypoint.name === keypointName) LOL
  return hand.keypoints[keypointIndex];
}

export function normalizedCoordsInPerc(
  keypoint: hdp.Keypoint,
  camWidth: number,
  camHeight: number
) {
  return {
    x: Math.min(Math.max(100 - (keypoint.x * 100) / camWidth, 0), 100),
    y: Math.min(Math.max((keypoint.y * 100) / camHeight, 0), 100),
  };
}
