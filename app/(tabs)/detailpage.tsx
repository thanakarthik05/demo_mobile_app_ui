import { FontAwesome } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* PROFILE HEADER */}
      <ThemedView style={styles.profileContainer}>
        <IconSymbol name="person.circle" size={100} color="#555" />
        <ThemedText type="title" style={styles.profileName}>
          John Doe
        </ThemedText>
        <ThemedText style={styles.profileEmail}>
          johndoe@example.com
        </ThemedText>
      </ThemedView>

      {/* CARD: Orders */}
      <ThemedView style={styles.card}>
        <Collapsible title="My Orders">
          {/* <ThemedText><FontAwesome name="check-circle" size={18} color="green" />3 Delivered</ThemedText> */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="check-circle" size={18} color="green" />
            <ThemedText style={{ marginLeft: 6 }}>2 Delivered</ThemedText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="truck" size={18} color="#007bff" />
            <ThemedText style={{ marginLeft: 6 }}>4 In Transit</ThemedText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="spinner" size={18} color="orange" />
            <ThemedText style={{ marginLeft: 6 }}>0 Pending</ThemedText>
          </View>

        </Collapsible>
      </ThemedView>

      {/* CARD: Cart */}
      <ThemedView style={styles.card}>
        <Collapsible title="My Cart">
          <ThemedText>Your cart has 3 items.</ThemedText>
        </Collapsible>
      </ThemedView>

      {/* CARD: Reports */}
      <ThemedView style={styles.card}>
        <Collapsible title="Reports">
          <ThemedText>
            View your purchase history, spending reports, and invoices.
          </ThemedText>
          <ExternalLink href="https://example.com/reports">
            <ThemedText type="link">Open detailed reports</ThemedText>
          </ExternalLink>
        </Collapsible>
      </ThemedView>

      {/* CARD: Logout */}
      <ThemedView style={styles.card}>
        <Collapsible title="Logout">
          <ThemedText style={{ color: 'red', fontWeight: '600' }}>
            Tap here to logout from your account.
          </ThemedText>
        </Collapsible>
      </ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  profileContainer: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
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