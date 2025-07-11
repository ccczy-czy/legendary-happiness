import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import MyCircle from "@/components/Circle";

import { dotRadius } from "@/constants";

type MovableCircleProps = {
  /*
      ID of movable circle
    */
  id: string;
  /*
    x coordinate of the center of the circle
    */
  initialX: number;
  /*
    y coordinate of the center of the circle
    */
  initialY: number;
  /*
    determine if the dot is movable
  */
  isMovable: boolean;
};

type Props = {
  /*
    props of movable circle
    */
  movableCircle: MovableCircleProps;

  turnOffMovable: (targetId: string, finalX: number, finalY: number) => void;
};

export default function MovableCircle({
  movableCircle,
  turnOffMovable,
}: Props) {
  const x = useSharedValue(movableCircle.initialX - dotRadius);
  const y = useSharedValue(movableCircle.initialY - dotRadius);
  const previousX = useSharedValue(0);
  const previousY = useSharedValue(0);
  const frozen = useSharedValue(!movableCircle.isMovable);

  const pan = Gesture.Pan()
    .onStart(() => {
      previousX.value = x.value;
      previousY.value = y.value;
    })
    .onUpdate((e) => {
      if (frozen.value) return;
      x.value = previousX.value + e.translationX;
      y.value = previousY.value + e.translationY;
    })
    .onEnd(() => {
      frozen.value = true;
      turnOffMovable(movableCircle.id, x.value, y.value);
    })
    .runOnJS(true);

  const longPressThenPan = Gesture.Simultaneous(
    Gesture.LongPress().minDuration(300),
    pan
  );

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
  }));

  return movableCircle.isMovable ? (
    <GestureDetector gesture={longPressThenPan}>
      <Animated.View style={[animatedStyle]}>
        <MyCircle
          key={movableCircle.id}
          circle={{
            r: dotRadius,
            fill: "#2e7d32",
            stroke: "#66bb6a",
            strokeWidth: 1,
          }}
          style={{
            position: "absolute",
          }}
        />
      </Animated.View>
    </GestureDetector>
  ) : (
    <MyCircle
      key={movableCircle.id}
      circle={{
        r: dotRadius,
        fill: "#424242",
        stroke: "#bdbdbd",
        strokeWidth: 1,
      }}
      style={[
        {
          position: "absolute",
          left: movableCircle.initialX,
          top: movableCircle.initialY,
        },
        animatedStyle,
      ]}
    />
  );
}

export { MovableCircleProps };
