import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Versicules from '../components/Versicules';
import Header from '../components/Header';
import Chapters from './Chapters';
import Footer from './Footer';
import Books from './Books';
import {
  updateBook,
  updateDevice,
  updateChapter,
  updateLanguage,
  updateFavorites,
  changeBookColumns,
  updateShowPromises,
  updateFontSizeVerse,
  updateShowJesusQuotes,
  updateRetrieveFavorites,
} from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Storage } from '../utils/storage';
import { KEY } from '../constants/storageKeys';

const useFetchData = (dispatch, setLoadingStates) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          lang,
          sizeVerse,
          favorites,
          book,
          chapter,
          showPromises,
          showJesusQuotes,
        ] = await Promise.all([
          Storage.getItem(KEY.Language),
          Storage.getItem(KEY.FontSizeVerse),
          Storage.getItem(KEY.Favorites),
          Storage.getItem(KEY.Book),
          Storage.getItem(KEY.Chapter),
          Storage.getItem(KEY.ShowPromises),
          Storage.getItem(KEY.ShowJesusQuotes),
        ]);

        if (lang || lang === 0) dispatch(updateLanguage(lang));
        if (sizeVerse) dispatch(updateFontSizeVerse(sizeVerse));
        if (favorites) {
          dispatch(updateFavorites(favorites));
          dispatch(updateRetrieveFavorites(favorites));
        }
        if (chapter) dispatch(updateChapter(chapter));
        if (showPromises) dispatch(updateShowPromises(showPromises));
        if (showJesusQuotes) dispatch(updateShowJesusQuotes(showJesusQuotes));
        if (book) {
          dispatch(updateBook(book));
        } else {
          const tempBook = { id: 1, name: ["Genesis", "Génesis"], chapters: 50 };
          dispatch(updateBook(tempBook));
          dispatch(updateChapter(1));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingStates(prevState => ({
          ...prevState,
          isLoadingLanguage: false,
          isLoadingBooks: false,
          isLoadingBook: false,
          isLoadingChapters: false,
          isLoadingVerses: false,
        }));
      }
    };
    fetchData();
  }, [dispatch, setLoadingStates]);
};

const Home = () => {
  const dispatch = useDispatch();

  const [loadingStates, setLoadingStates] = useState({
    isLoadingLanguage: true,
    isLoadingBooks: true,
    isLoadingBook: true,
    isLoadingChapters: true,
    isLoadingVerses: true,
  });

  useFetchData(dispatch, setLoadingStates);
  const languageValue = useSelector(state => state.quote.language);
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  useEffect(() => {
    changeScreenOrientation();
  }, [])
  useFocusEffect(
    useCallback(() => {
      dispatch(changeBookColumns(11));
      dispatch(updateDevice({ type: 'tablet' }));
    }, [dispatch])
  );
  const isLoading = useMemo(() =>
    loadingStates.isLoadingLanguage ||
    loadingStates.isLoadingBooks ||
    loadingStates.isLoadingBook ||
    loadingStates.isLoadingChapters ||
    loadingStates.isLoadingVerses,
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
    <View style={styles.main}>
      <View style={styles.left}>
        <Header />
          <View style={styles.versicules}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Versicules />
            </GestureHandlerRootView>
          </View>

        <Footer language={languageValue} />
      </View>
      <View style={styles.right}>
        <View style={styles.books}>
          <Books />
        </View>
        <View style={styles.chapters}>
          <Chapters />
        </View>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: "row",
  },
  left: {
    flex: 5,
  },
  versicules: {
    flex: 16,
    backgroundColor: 'skyblue', // FOR REMOVE
  },
  right: {
    flex: 8,
  },
  books: {
    width: 'auto',
    backgroundColor: 'lightblue',
  },
  chapters: {
    flex: 1,
    backgroundColor: '#a1e8ff',
  },
});