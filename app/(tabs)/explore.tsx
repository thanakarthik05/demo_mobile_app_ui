import { StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.circle"
          style={styles.headerImage}
        />
      }
    >
      {/* TITLE */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          User Profile
        </ThemedText>
      </ThemedView>

      {/* USER NAME */}
      <ThemedText style={styles.userName}>
        Name: John Doe
      </ThemedText>

      {/* ORDERS */}
      <Collapsible title="My Orders">
        <ThemedText>• Order #1234 - Delivered</ThemedText>
        <ThemedText>• Order #1235 - In Transit</ThemedText>
        <ThemedText>• Order #1236 - Pending</ThemedText>
      </Collapsible>

      {/* CART */}
      <Collapsible title="My Cart">
        <ThemedText>Your cart has 3 items.</ThemedText>
        <ThemedText>You can review and checkout from the Cart tab.</ThemedText>
      </Collapsible>

      {/* REPORTS */}
      <Collapsible title="Reports">
        <ThemedText>
          View your purchase history, spending reports, and saved invoices.
        </ThemedText>
        <ExternalLink href="https://example.com/reports">
          <ThemedText type="link">Open detailed reports</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* LOGOUT */}
      <Collapsible title="Logout">
        <ThemedText style={{ color: 'red' }}>
          Tap here to logout from your account.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  userName: {
    marginBottom: 16,
    fontSize: 16,
  },
});
