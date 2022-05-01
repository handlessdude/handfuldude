import type * as hdp from "@tensorflow-models/hand-pose-detection";

export function extractHanded(predictions: hdp.Hand[], handedness: string) {
    return predictions.find((hand => hand.handedness === handedness))
}

export function extractKeypoint(hand: hdp.Hand, keypointName: string) {
    //return hand.keypoints.find(keypoint => keypoint.name === keypointName)
    return hand.keypoints[8]
}

export function normalizedCoordsInPerc(keypoint: hdp.Keypoint, 
                                camWidth:number, 
                                camHeight:number) {
    return {
        x: Math.min(Math.max(100 - (keypoint.x * 100 / camWidth), 0), 100),
        y: Math.min(Math.max(keypoint.y * 100 / camHeight, 0), 100),
    }
}