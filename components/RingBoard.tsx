import { useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Dot, { DotProps } from "@/components/Dot";
import Ring from "@/components/Ring";
import EnclosingCircle from "./EnclosingCircle";

import { dotSize, initialRingSize, ringColors } from "@/constants";
import smallestEnclosingCircle from "@/helpers/smallest-enclosing-circle";

type Circle = {
  x: number;
  y: number;
  r: number;
};

export default function RingBoard() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [dots, setDots] = useState<DotProps[]>([]);
  const [enclosingCircle, setEnclosingCircle] = useState<Circle | undefined>(
    undefined
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
      const newDot = {
        id: `${Math.random()}`,
        x: event.x - dotSize / 2,
        y: event.y - dotSize / 2,
      };
      const newDots = [...dots, newDot];
      setDots(newDots);
      const newCircle = smallestEnclosingCircle(
        newDots.map((dot) => {
          return { x: dot.x, y: dot.y };
        })
      );
      setEnclosingCircle(newCircle);
    })
    .runOnJS(true);

  const composed = Gesture.Simultaneous(pinch, pan, tap);

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

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.ringBoardContainer, animatedStyle]}>
        {dots.length > 1 && enclosingCircle && (
          <EnclosingCircle
            x={enclosingCircle.x}
            y={enclosingCircle.y}
            radius={enclosingCircle.r}
          />
        )}
        {dots.map((dot) => {
          return (
            <Dot
              key={dot.id}
              dot={dot}
              scale={scale}
              updateDots={(newDot: DotProps) => setDots([...dots, newDot])}
            />
          );
        })}
        {ringColors.map((color, i) => {
          const size = initialRingSize - 36 * i;
          let borderColor = undefined;
          if (i % 2 && color === "#000") {
            borderColor = "#fff";
          }
          return (
            <Ring
              key={`${color}-${size}`}
              size={size}
              fillColor={color}
              borderColor={borderColor}
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
  dotContainer: {
    zIndex: 1,
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    backgroundColor: "#424242",
  },
});
