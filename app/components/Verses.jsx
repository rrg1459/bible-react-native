import { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreen, updateFavorites } from '../redux/quoteSlice';
import { KEY } from '../constants/storageKeys';
import { Storage } from '../utils/storage';
import fillVerses from '../utils/fillVerses';
import versesAbbs from '../utils/versesAbbs';
import Verse from '../components/Verse';
import handleVersesFavorites from '../utils/handleVersesFavorites';
import favoriteVersesInTheChapter from '../utils/favoriteVersesInTheChapter';

const ComponentVerses = () => {
  const languageValue = useSelector(state => state.quote.language);
  const numVerses = useSelector(state => state.quote.numVerses);
  const book = useSelector(state => state.quote.book);
  const chapter = useSelector(state => state.quote.numChapter);
  const favorites = useSelector(state => state.quote.favorites);
  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;

  const [verses, setVerses] = useState([]);
  const [verseAbbs, setVerseAbbs] = useState('');
  const [bible, setBible] = useState('');
  const [showFavorite, setShowFavorite] = useState(false);
  const [favoriteVerses, setFavoriteVerses] = useState([]);

  useEffect(() => {
    setFavoriteVerses(favoriteVersesInTheChapter({ favorites, book_id: book.id, chapter }));
  }, [book, chapter, favorites]);

  useEffect(() => {
    setShowFavorite(favoriteVerses.length > 0);
  }, [favoriteVerses]);

  useEffect(() => {
    setVerseAbbs(versesAbbs({ numVerses, language: languageValue }));
  }, [numVerses, languageValue]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter }));
  }, [book.id, chapter]);

  useEffect(() => {
    setBible(languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version');
  }, [languageValue]);

  useFocusEffect(
    useCallback(() => {
      dispatch(changeScreen(ScreenName));
    }, [dispatch, ScreenName])
  );

  const saveFavorites = useCallback(async (favorites) => {
    try {
      await Storage.setItem(KEY.Favorites, favorites);
      await Storage.setItem(KEY.RetrieveFavorites, favorites);
    } catch (error) {
      console.error('Failed to save font favorites verse:', error);
    }
  }, []);

  const handleFavorites = useCallback(() => {
    setShowFavorite(prevShowFavorite => !prevShowFavorite);

    const updatedFavorites = handleVersesFavorites({
      favorites,
      book_id: book.id,
      chapter,
      numVerses,
      removeAll: showFavorite
    });

    dispatch(updateFavorites(updatedFavorites));
    saveFavorites(updatedFavorites);
  }, [favorites, book.id, chapter, numVerses, showFavorite, dispatch, saveFavorites]);

  const handleShare = useCallback(async () => {
    let quote = `${bible}\n${book.name[languageValue]} ${chapter}${verseAbbs}`;
    numVerses.forEach(num => {
      const text = verses.find(item => item.verse === num).text;
      const prefix = numVerses.length > 1 ? `\n${num / 10}. ` : '\n';
      quote += prefix + text[languageValue];
    });

    try {
      await Share.share({ message: quote });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [bible, book.name, chapter, verseAbbs, numVerses, verses, languageValue]);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerBible}>{bible}</Text>
          <Text style={styles.headerBook}>{book.name[languageValue]}</Text>
          <View style={styles.headerQuote}>
            <Text style={styles.headerChapter}>{chapter}</Text>
            <Text style={styles.headerAbbs}>{verseAbbs}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleFavorites}>
            <Image
              source={showFavorite ? require('../images/heart.png') : require('../images/empty.png')}
              style={[styles.headerImages, { display: verseAbbs ? 'flex' : 'none' }]}
            />
          </TouchableOpacity>
          {verseAbbs !== '' && (
            <TouchableOpacity onPress={handleShare}>
              <Image
                source={require('../images/share.png')}
                style={styles.headerImages}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.verses}>
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

export default ComponentVerses;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  header: {
    backgroundColor: '#7dfcd2',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 3,
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerImages: {
    height: 35,
    width: 35,
  },
  headerBible: {
    fontSize: 13,
    paddingTop: 5,
  },
  headerBook: {
    fontSize: 25,
  },
  headerQuote: {
    flexDirection: 'row',
  },
  headerChapter: {
    fontWeight: '500',
    paddingBottom: 5,
    fontSize: 16,
  },
  headerAbbs: {
    flex: 1,
    paddingTop: 1,
    paddingBottom: 5,
    fontSize: 15,
  },
  verses: {
    paddingBottom: 100,
  },
});