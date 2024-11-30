import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/app/components/HapticTab';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="chapters"
        options={{
          title: 'Chapters',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chair.fill" color={color} />,
        }}
      />

      <Tabs.Screen name="verses" options={{href: null}} />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'RETURN',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
