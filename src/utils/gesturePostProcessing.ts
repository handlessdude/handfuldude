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
  VICTORY = "victory",
}

// -_- wtf typescript problems
// const GesturesMapActions = {
//   [GestureTypes.THUMBS_UP]: "click",
//   [GestureTypes.VICTORY]: "focus",
// };
export function gestureReducer(gesture: IGesture) {
  switch (gesture.name) {
    case GestureTypes.THUMBS_UP:
      return "click";
    case GestureTypes.VICTORY:
      return "focus";
    default:
      return null;
  }

  //   if (Object.prototype.hasOwnProperty(GesturesMapActions, gesture.name)) {
  //     return GesturesMapActions[gesture.name];
  //   }
  //return GesturesMapActions[gesture.name];
}
