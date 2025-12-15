import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { router } from "expo-router";

import { HapticTab } from '@/components/haptic-tab';
import { FontAwesome } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Header from '@/components/Header';

export default function TabLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          // headerTitle:()=><Header/>,
          headerTitle: () => (
            <Header
              searchQuery={searchQuery}
              setSearchQuery={(text) => {
                setSearchQuery(text);          // update state
                router.setParams({ search: text }); // ✅ update URL
              }}
            />
          ),
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
        initialParams={{ searchQuery }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'user',
          tabBarIcon: ({ color }) => 
          <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cartlist"
        options={{
          title: 'cart',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart/cart"
        options={{
          href: null,     // <--- Hides from tab bar  ****if is not ass
        }}
      />

    </Tabs>
  );
}
