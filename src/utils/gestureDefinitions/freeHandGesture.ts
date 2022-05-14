import * as fp from "fingerpose";

const freeHandGesture = new fp.GestureDescription("free_hand");
for (const finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  freeHandGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  freeHandGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  freeHandGesture.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.9);
  freeHandGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
}

export default freeHandGesture;
