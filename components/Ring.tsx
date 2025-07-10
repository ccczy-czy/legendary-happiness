import { StyleSheet, View } from "react-native";

type Props = {
  size: number;
  fillColor: string;
  borderColor?: string;
};

export default function Ring({ size, fillColor, borderColor }: Props) {
  return (
    <View
      style={[
        styles.ringContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: fillColor,
          borderColor: borderColor ?? "#000",
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  ringContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
