import { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PinchGestureHandler, State } from 'react-native-gesture-handler'; // Correct imports

import Verse from '../components/Verse';
import favoriteVersesInTheChapter from '../utils/favoriteVersesInTheChapter';
import fillVerses from '../utils/fillVerses';
import { updateFontSizeVerse, loadingVerses } from '../redux/quoteSlice';

const ComponentVersicules = () => {
  const dispatch = useDispatch();

  const {
    showJesusQuotes,
    isLoadingVerses,
    fontSizeVerse,
    showPromises,
    favorites,
    numChapter: chapter, // Rename numChapter to chapter for consistency
    book,
  } = useSelector(state => state.quote);

  const [favoriteVerses, setFavoriteVerses] = useState([]);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    setFavoriteVerses(favoriteVersesInTheChapter({ favorites, book_id: book.id, chapter }));
  }, [favorites, book.id, chapter]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter }));
    dispatch(loadingVerses(false));
  }, [book.id, chapter, dispatch]);

  const onPinchGestureEvent = useCallback(
    (event) => {
      if (event.nativeEvent.state === State.END) {
        const scale = event.nativeEvent.scale;

        let newCalculatedSize = fontSizeVerse;

        if (scale > 1.0 && fontSizeVerse < 30) {
          newCalculatedSize = fontSizeVerse + 5;
        } else if (scale < 1.0 && fontSizeVerse > 10) {
          newCalculatedSize = fontSizeVerse - 5;
        }

        if (newCalculatedSize !== fontSizeVerse) {
          dispatch(updateFontSizeVerse(newCalculatedSize));
        }
      }
    },
    [fontSizeVerse, dispatch]
  );

  const renderVerseItem = useCallback(
    ({ item }) => (
      <Verse
        verse={item}
        jesusQuote={showJesusQuotes}
        promise={showPromises ? item.promise : false}
        favorite={favoriteVerses.includes(item.verse)}
        fontSize={fontSizeVerse}
      />
    ),
    [showJesusQuotes, showPromises, favoriteVerses, fontSizeVerse]
  );

  if (isLoadingVerses || verses.length === 0) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <PinchGestureHandler onHandlerStateChange={onPinchGestureEvent}>
      <View style={styles.main}>
        <FlatList
          data={verses}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderVerseItem} // Use the memoized renderItem
          keyExtractor={(verse) => String(verse.id)} // Ensure key is a string
          initialNumToRender={10} // Optimize initial rendering
          maxToRenderPerBatch={5} // Optimize rendering of new items on scroll
          windowSize={21} // Optimize the number of items kept in memory
        />
      </View>
    </PinchGestureHandler>
  );
};
export default ComponentVersicules;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});