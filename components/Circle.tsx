import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";

type CircleProps = {
  /*
    x coordinate of the center of the circle
    */
  x?: number;
  /*
    y coordinate of the center of the circle
    */
  y?: number;
  /*
    radius of the circle
    */
  r: number;
  /*
    stroke color of the circle
    */
  stroke?: string;
  /*
    stroke width of the circle
    */
  strokeWidth?: number;
  /*
    fill color of the circle
    */
  fill?: string;
};

type Props = {
  /*
    props of circle
    */
  circle: CircleProps;
  /*
    style of the circle container
    */
  style?: StyleProp<ViewStyle>;
};

export default function MyCircle({ circle, style }: Props) {
  return (
    <View style={[styles.circleContainer, style]}>
      <Svg
        height={2 * circle.r}
        width={2 * circle.r}
        viewBox={`-${circle.strokeWidth ?? 0} -${circle.strokeWidth ?? 0} ${
          2 * (circle.r + (circle.strokeWidth ?? 0))
        } ${2 * (circle.r + (circle.strokeWidth ?? 0))}`}
      >
        <Circle
          cx={circle.x ? circle.x : circle.r}
          cy={circle.y ? circle.y : circle.r}
          r={circle.r}
          fill={circle.fill}
          stroke={circle.stroke}
          strokeWidth={circle.strokeWidth}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    position: "absolute",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
  },
});
