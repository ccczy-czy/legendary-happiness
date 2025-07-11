import { useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import uuid from "react-native-uuid";

import MyCircle from "@/components/Circle";
import MovableCircle, { MovableCircleProps } from "./MovableCircle";

import { dotRadius, initialRingRadius, ringColors, ringGap } from "@/constants";

export default function RingBoard() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [movableCircles, setMovableCircles] = useState<MovableCircleProps[]>(
    []
  );

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .minPointers(2)
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const tap = Gesture.Tap()
    .onEnd((event) => {
      const newMovableCirble = {
        id: uuid.v4(),
        initialX: event.x,
        initialY: event.y,
        isMovable: false,
      };
      if (
        newMovableCirble.initialX >= dotRadius &&
        newMovableCirble.initialX <= 380 - dotRadius &&
        newMovableCirble.initialY >= dotRadius &&
        newMovableCirble.initialY <= 380 - dotRadius
      ) {
        setMovableCircles((currentMovableCircles) => [
          ...currentMovableCircles,
          newMovableCirble,
        ]);
      }
    })
    .runOnJS(true);

  const longPress = Gesture.LongPress()
    .onStart((e) => {
      setMovableCircles((currentMovableCircles) => [
        ...currentMovableCircles,
        {
          id: uuid.v4(),
          initialX: e.x,
          initialY: e.y,
          isMovable: true,
        },
      ]);
    })
    .runOnJS(true);
  const composed = Gesture.Simultaneous(pinch, pan, tap, longPress);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const turnOffMovable = (targetId: string, finalX: number, finalY: number) => {
    const newMovableCircles = movableCircles.map((movableCircle) =>
      movableCircle.id === targetId
        ? {
            ...movableCircle,
            isMovable: false,
            initialX: finalX,
            initialY: finalY,
          }
        : movableCircle
    );
    setMovableCircles(newMovableCircles);
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.ringBoardContainer, animatedStyle]}>
        {ringColors.map((color, i) => {
          const radius = initialRingRadius - ringGap * i;
          let stroke = "#000";
          if (i % 2 && color === "#000") {
            stroke = "#fff";
          }
          return (
            <MyCircle
              key={`${color}-${radius}`}
              circle={{ r: radius, fill: color, stroke, strokeWidth: 1 }}
            />
          );
        })}
        {movableCircles.map((movableCircle) => {
          return (
            <MovableCircle
              key={movableCircle.id}
              movableCircle={{
                id: movableCircle.id,
                initialX: movableCircle.initialX,
                initialY: movableCircle.initialY,
                isMovable: movableCircle.isMovable,
              }}
              turnOffMovable={turnOffMovable}
            />
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ringBoardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    height: 380,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
});
