import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";

export default function CartScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          🛒 Your Cart
        </Text>

        <Text style={{ marginTop: 20 }}>
          Cart items will appear here...
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
