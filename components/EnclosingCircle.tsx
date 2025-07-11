import { StyleSheet, View } from "react-native";

type Props = {
  x: number;
  y: number;
  radius: number;
};

export default function EnclosingCircle({ x, y, radius }: Props) {
  return (
    <View
      style={[
        styles.circleContainer,
        {
          width: 2 * radius,
          height: 2 * radius,
          borderRadius: radius,
          left: x,
          top: y,
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    zIndex: 1,
    position: "absolute",
    borderWidth: 1,
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    borderColor: "#64dd17",
    backgroundColor: "none",
  },
});
