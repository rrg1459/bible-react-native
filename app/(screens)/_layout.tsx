import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/app/components/HapticTab';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useCustomSelector } from '../redux/hook';

export default function TabLayout() {

  const [showState, setShowState] = useState({
    books: false,
    chapters: false,
    settings: false,
  });

  const colorScheme = useColorScheme();
  const currentScreen = useCustomSelector(state => state.quote.currentScreen);

  useEffect(() => {
    switch (currentScreen) {
      case 'index':
        setShowState({ books: false, chapters: false, settings: false });
        break;
      case 'chapters':
        setShowState({ books: true, chapters: false, settings: false });
        break;
      case 'verses':
        setShowState({ books: true, chapters: true, settings: false });
        break;
      case 'settings':
        setShowState({ books: false, chapters: false, settings: true });
        break;
      default:
        // Handle unexpected cases or default state
        break;
    }
  }, [currentScreen]);

  const { books, chapters, settings } = showState;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          display: books || settings ? 'flex' : 'none',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
          href: books ? '/' : null
        }}
      />

      <Tabs.Screen
        name="chapters"
        options={{
          title: 'Chapters',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chair.fill" color={color} />,
          href: chapters ? '/chapters' : null
        }}
      />

      <Tabs.Screen name="verses" options={{href: null}} />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'RETURN',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
          href: settings ? '/' : null
        }}
      />
    </Tabs>
  );
}
