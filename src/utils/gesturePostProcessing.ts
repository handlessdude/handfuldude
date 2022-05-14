import { createEvent, createKeyboardEvent } from "@/utils/eventHandling";

export interface IGesture {
  name: string;
  score: number;
}

export function extractMaxScoreGesture(gestures: IGesture[]) {
  let expectedGesture: IGesture = { name: "", score: 0 };
  gestures.forEach((gesture) => {
    if (gesture.score > expectedGesture.score) {
      expectedGesture = { ...gesture };
    }
  });
  return expectedGesture;
}

export enum GestureTypes {
  THUMBS_UP = "thumbs_up",
  THUMBS_DOWN = "thumbs_down",
  VICTORY = "victory",
  STOP = "free_hand",
}

export function gestureReducer(gesture: IGesture) {
  switch (gesture.name) {
    case GestureTypes.THUMBS_DOWN:
      return createKeyboardEvent("keydown", { key: "Escape" });
    case GestureTypes.THUMBS_UP:
      return createKeyboardEvent("keydown", { key: "Enter" });
    case GestureTypes.VICTORY:
      return createEvent("click");
    case GestureTypes.STOP:
      return createEvent("focus");
    default:
      return null;
  }
}
