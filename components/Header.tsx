import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>🛒 SZ Shop</Text>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={16} color="#999" />
        <TextInput
          placeholder="Search products..."
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // small & safe gap
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  searchBox: {
    flex: 1, // 🔑 makes it responsive
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});
