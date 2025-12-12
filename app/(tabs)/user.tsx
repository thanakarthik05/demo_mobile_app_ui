import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
type User = {
  name: string;
  email: string;
};

export default function TabTwoScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <ScrollView contentContainerStyle={styles.container}>
      
          {/* PROFILE HEADER */}
          <ThemedView style={styles.card}>
            <IconSymbol name="person.circle" size={100} color="#555" />

            <ThemedText type="title" style={styles.profileName}>
              {user?.name || "Loading..."}
            </ThemedText>

            <ThemedText style={styles.profileEmail}>
              {user?.email || ""}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.card}>
            <Collapsible title="My Cart">
              <ThemedText>Your cart has 3 items.</ThemedText>
            </Collapsible>
          </ThemedView>

          {/* LOGOUT BTN */}
          <ThemedView style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <FontAwesome name="sign-out" size={18} color="red" />
                <Text style={{ color: "red", marginLeft: 8 }}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </ThemedView>

        </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  profileName: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: Fonts.rounded,
  },
  profileEmail: {
    opacity: 0.7,
    marginTop: 4,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});
