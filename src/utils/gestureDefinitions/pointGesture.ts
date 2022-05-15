import * as fp from "fingerpose";

// describe victory gesture ✌️
const pointGesture = new fp.GestureDescription("point");

// thumb:
pointGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
// pointGesture.addDirection(
//   fp.Finger.Thumb,
//   fp.FingerDirection.HorizontalLeft,
//   1.0
// );
// pointGesture.addDirection(
//   fp.Finger.Thumb,
//   fp.FingerDirection.HorizontalRight,
//   1.0
// );
pointGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
pointGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);

// index:
pointGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
pointGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
pointGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);
pointGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
pointGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
);

for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pointGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  pointGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default pointGesture;
