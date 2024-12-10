import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
// import { HapticTab } from '@/app/components/HapticTab';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useSelector } from 'react-redux';

export default function TabLayout() {

  const [showState, setShowState] = useState({
    books: false,
    chapters: false,
    settings: false,
  });

  const colorScheme = useColorScheme();
  const currentScreen = useSelector(state => state.quote.currentScreen);
  const languageValue = useSelector(state => state.quote.language);

  useEffect(() => {
    switch (currentScreen) {
      case 'books':
        setShowState({ books: false, chapters: false, settings: false });
        break;
      case 'chapters':
        setShowState({ books: true, chapters: false, settings: false });
        break;
      case 'verses':
        setShowState({ books: true, chapters: true, settings: false });
        break;
      case 'settings':
        setShowState({ books: false, chapters: false, settings: false });
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
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          display: books ? 'flex' : 'none',
        }
      }}>
      <Tabs.Screen
        name="books"
        options={{
          title: languageValue ? 'Libros' : 'Books',
          headerTransparent: true,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
          href: books ? '/' : null
        }}
      />

      <Tabs.Screen
        name="chapters"
        options={{
          title: languageValue ? 'Capítulos' : 'Chapters',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chair.fill" color={color} />,
          href: chapters ? '/chapters' : null
        }}
      />

      <Tabs.Screen name="index" options={{href: null}} />
      <Tabs.Screen name="verses" options={{href: null}} />
      <Tabs.Screen name="settings" options={{ href: null }} />

    </Tabs>
  );
}
