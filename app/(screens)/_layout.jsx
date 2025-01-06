import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useDispatch, useSelector } from 'react-redux';
import { Storage } from '../utils/storage.js';
import { KEY } from '../constants/storageKeys.js';
import {
  changeChapterColumns,
  updateFontSizeVerse,
  changeBookColumns,
  updateFavorites,
  updateLanguage,
  changeType,
} from '../redux/quoteSlice';

export default function TabLayout() {

  const dispatch = useDispatch();

  const [showState, setShowState] = useState({
    books: false,
    chapters: false,
    settings: false,
  });
  
  const colorScheme = useColorScheme();
  const currentScreen = useSelector(state => state.quote.currentScreen);
  const languageValue = useSelector(state => state.quote.language);
  
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(true);
  const [isLoadingTypeID, setIsLoadingTypeID] = useState(true);

  useEffect(() => {
  const fetchBookColumns = async () => {
    const bookColumns = await Storage.getItem(KEY.BookColumns);
    setIsLoadingBooks(false);
    if (bookColumns) dispatch(changeBookColumns(bookColumns));
  };

  const fetchLanguage = async () => {
    const lang = await Storage.getItem(KEY.Language);
    setIsLoadingLanguage(false);
    if (lang || lang === 0) {
      dispatch(updateLanguage(lang));
    }
  };

  const fetchTypeID = async () => {
    const typeID = await Storage.getItem(KEY.TypeID);
    setIsLoadingTypeID(false);
    if (typeID) dispatch(changeType(typeID));
  };

  const fetchChapterColumns = async () => {
    const chapterColumns = await Storage.getItem(KEY.ChapterColumns);
    if (chapterColumns) dispatch(changeChapterColumns(chapterColumns));
  };

  const fetchSizeVerse = async () => {
    const sizeVerse = await Storage.getItem(KEY.FontSizeVerse);
    if (sizeVerse) dispatch(updateFontSizeVerse(sizeVerse));
  };

  const fetchFavorites = async () => {
    const favorites = await Storage.getItem(KEY.Favorites);
    if (favorites) dispatch(updateFavorites(favorites));
  };

    fetchLanguage();
    fetchBookColumns();
    fetchChapterColumns();
    fetchSizeVerse();
    fetchFavorites();
    fetchTypeID();
  }, [dispatch]);

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
        break;
    }
  }, [currentScreen]);

  const { books, chapters } = showState;

  if (isLoadingBooks || isLoadingLanguage || isLoadingTypeID) {
    return (
      <View>
        <ActivityIndicator size='large' color='blue' />
      </View>
    )
  };

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

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="verses" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
};
