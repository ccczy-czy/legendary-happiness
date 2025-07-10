import { StyleSheet, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 360,
          height: 360,
          backgroundColor: "#fff",
          borderColor: "#000",
          borderWidth: 1,
          padding: 8,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: "50%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              height: "90%",
              backgroundColor: "#fff",
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: "50%",
            }}
          ></View>
        </View>
      </View>
    </View>
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
