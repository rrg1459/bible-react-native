import { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useDispatch, useSelector } from 'react-redux';
import { Storage } from '../utils/storage';
import { KEY } from '../constants/storageKeys';
import {
  changeType,
  updateLanguage,
  updateFavorites,
  changeBookColumns,
  updateShowPromises,
  updateFontSizeVerse,
  changeChapterColumns,
  updateShowJesusQuotes,
  updateRetrieveFavorites,
} from '../redux/quoteSlice';

const useFetchData = (dispatch, setLoadingStates) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          typeID,
          lang,
          sizeVerse,
          favorites,
          bookColumns,
          chapterColumns,
          showPromises,
          showJesusQuotes,
        ] = await Promise.all([
          Storage.getItem(KEY.TypeID),
          Storage.getItem(KEY.Language),
          Storage.getItem(KEY.FontSizeVerse),
          Storage.getItem(KEY.Favorites),
          Storage.getItem(KEY.BookColumns),
          Storage.getItem(KEY.ChapterColumns),
          Storage.getItem(KEY.ShowPromises),
          Storage.getItem(KEY.ShowJesusQuotes),
        ]);

        if (typeID) dispatch(changeType(typeID));
        if (lang || lang === 0) dispatch(updateLanguage(lang));
        if (sizeVerse) dispatch(updateFontSizeVerse(sizeVerse));
        if (favorites) {
          dispatch(updateFavorites(favorites));
          dispatch(updateRetrieveFavorites(favorites));
        }
        if (bookColumns) dispatch(changeBookColumns(bookColumns));
        if (chapterColumns) dispatch(changeChapterColumns(chapterColumns));
        if (showPromises !== null) dispatch(updateShowPromises(showPromises));
        if (showJesusQuotes !== null) dispatch(updateShowJesusQuotes(showJesusQuotes));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingStates(prevState => ({
          ...prevState,
          isLoadingBooks: false,
          isLoadingLanguage: false,
          isLoadingTypeID: false,
        }));
      }
    };

    fetchData();
  }, [dispatch, setLoadingStates]);
};

const useShowState = (currentScreen) => {
  const [showState, setShowState] = useState({
    books: false,
    chapters: false,
    settings: false,
  });

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

  return showState;
};

export default function TabLayout() {
  const dispatch = useDispatch();

  const [loadingStates, setLoadingStates] = useState({
    isLoadingBooks: true,
    isLoadingLanguage: true,
    isLoadingTypeID: true,
  });

  useFetchData(dispatch, setLoadingStates);

  const colorScheme = useColorScheme();
  const currentScreen = useSelector(state => state.quote.currentScreen);
  const languageValue = useSelector(state => state.quote.language);

  const showState = useShowState(currentScreen);
  const { books, chapters } = showState;

  const isLoading = useMemo(() => 
    loadingStates.isLoadingBooks || loadingStates.isLoadingLanguage || loadingStates.isLoadingTypeID, 
    [loadingStates]
  );

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <Tabs
    style={{margin: 10}}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarLabelPosition: 'beside-icon',
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
          tabBarLabelStyle: styles.tabBarLabelStyle,
          href: books ? '/' : null
        }}
      />
      <Tabs.Screen
        name="chapters"
        options={{
          title: languageValue ? 'Capítulos' : 'Chapters',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chair.fill" color={color} />,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          href: chapters ? '/chapters' : null

        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="verses" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: 'Georgia',
    fontWeight: '500',
  },
});