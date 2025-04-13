import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Verse from '../components/Verse';
import favoriteVersesInTheChapter from '../utils/favoriteVersesInTheChapter';
import fillVerses from '../utils/fillVerses';
import { updateFontSizeVerse, loadingVerses } from '../redux/quoteSlice';

const ComponentVersicules = () => {
  const dispatch = useDispatch();
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const favorites = useSelector(state => state.quote.favorites);
  const chapter = useSelector(state => state.quote.numChapter);
  const book = useSelector(state => state.quote.book);
  const isLoadingVerses = useSelector(state => state.quote.loadingVerses);
  const showJesusQuotes = useSelector(state => state.quote.showJesusQuotes);
  const showPromises = useSelector(state => state.quote.showPromises);

  const [newsize, setNewSize] = useState(fontSizeVerse);
  const [isUpdatingSize, setIsUpdatingSize] = useState(false);
  const [favoriteVerses, setFavoriteVerses] = useState([]);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    setFavoriteVerses(favoriteVersesInTheChapter({ favorites, book_id: book.id, chapter }));
  }, [book, chapter, favorites]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter }));
    dispatch(loadingVerses(false));
  }, [book.id, chapter, dispatch]);

  useEffect(() => {
    dispatch(updateFontSizeVerse(newsize));
    setIsUpdatingSize(false);
  }, [newsize, dispatch]);

  const onHandlerStateChange = useMemo(() => {
    return (event) => {
      if (event.nativeEvent.state === State.END) {
        const scale = event.nativeEvent.scale;
        if (scale > 1 && fontSizeVerse < 30) {
          setIsUpdatingSize(true);
          setNewSize(fontSizeVerse + 5);
        }
        if (scale < 1 && fontSizeVerse > 10) {
          setIsUpdatingSize(true);
          setNewSize(fontSizeVerse - 5);
        }
      }
    };
  }, [fontSizeVerse]);

  if (verses.length === 0 || isUpdatingSize || isLoadingVerses) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <PinchGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.main}>
        <FlatList
          data={verses}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Verse
              verse={item}
              jesusQuote={showJesusQuotes}
              promise={showPromises ? item.promise : false}
              favorite={favoriteVerses.includes(item.verse)}
            />
          )}
          keyExtractor={verse => String(verse.id)}
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
    justifyContent: "center",
    alignItems: "center",
  },
});