import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Svg, { Line } from "react-native-svg";

type DotProps = {
  id: string;
  x: number;
  y: number;
};

type Props = {
  dot: DotProps;
  scale: SharedValue<number>;
  updateDots: (newDot: DotProps) => void;
};

export default function Dot({ dot, scale, updateDots }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .activateAfterLongPress(500)
    .onChange((event) => {
      translateX.value += event.changeX / scale.value;
      translateY.value += event.changeY / scale.value;
      setIsPressed(true);
    })
    .onEnd((_, success) => {
      if (success) {
        setIsPressed(false);
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.dotContainer,
          {
            left: dot.x,
            top: dot.y,
            borderColor: isPressed ? "#66bb6a" : "#bdbdbd",
            backgroundColor: isPressed ? "#2e7d32" : "#424242",
          },
          animatedStyle,
        ]}
      >
        {isPressed && <Cross></Cross>}
      </Animated.View>
    </GestureDetector>
  );
}

function Cross() {
  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        left: -8,
        top: -8,
      }}
    >
      <Svg height="28" width="28">
        <Line x1="0" y1="14" x2="28" y2="14" stroke="#e8f5e9" strokeWidth="1" />
        <Line x1="14" y1="0" x2="14" y2="28" stroke="#e8f5e9" strokeWidth="1" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
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

export { DotProps };
