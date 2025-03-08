import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Verse from '../components/Verse';
import favoriteVersesInTheChapter from '../utils/favoriteVersesInTheChapter';
import fillVerses from '../utils/fillVerses';

const ComponentVersicules = () => {
  const favorites = useSelector(state => state.quote.favorites);
  const chapter = useSelector(state => state.quote.numChapter);
  const book = useSelector(state => state.quote.book);

  const [favoriteVerses, setFavoriteVerses] = useState([]);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    setFavoriteVerses(favoriteVersesInTheChapter({ favorites, book_id: book.id, chapter }));
  }, [book, chapter, favorites]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter }));
  }, [book.id, chapter]);

  if (verses.length === 0) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='yellow' />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View>
        <FlatList
          data={verses}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Verse
              verse={item}
              verseFavorite={favoriteVerses.includes(item.verse)}
            />
          )}
          keyExtractor={verse => String(verse.id)}
        />
      </View>
    </View>
  );
};

export default ComponentVersicules;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  activityIndicator: {
    // backgroundColor: 'yellow',
    flex: 1,
    // width: '100%',
    // height: '500px',
    justifyContent: "center",
    alignItems: "center",
  },
});