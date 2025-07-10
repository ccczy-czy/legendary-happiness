import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import Button from "@/components/Button";

export default function Index() {
  const router = useRouter();
  const handleNavigate = () => {
    router.navigate("/record");
  };

  return (
    <View style={styles.container}>
      <Button label="Start Training" onPress={handleNavigate} />
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
