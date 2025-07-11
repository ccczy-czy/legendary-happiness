import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RingBoard from "@/components/CircleBoard";

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <RingBoard></RingBoard>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeeee",
  },
  text: {
    color: "#fff",
  },
});
