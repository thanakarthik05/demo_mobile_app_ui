import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { FontAwesome } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
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
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cart-plus" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
