import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Ring from "@/components/Ring";

import { initialRingSize, ringColors } from "@/constants";

export default function RingBoard() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const drag = Gesture.Pan()
    .minPointers(2)
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const composed = Gesture.Simultaneous(pinch, drag);

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
});
