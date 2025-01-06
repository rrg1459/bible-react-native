import { useEffect, useState } from 'react';
import { FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { changeScreen, updateFavorites } from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { KEY } from '../constants/storageKeys.js';
import { Storage } from '../utils/storage.js';
import fillVerses from '../utils/fillVerses';
import versesAbbs from '../utils/versesAbbs';
import Verse from "../components/Verse.jsx";
import handleVersesFavorites from '../utils/handleVersesFavorites.js';
import favoriteVersesInTheChapter from '../utils/favoriteVersesInTheChapter.js';

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
    console.log('xxx KABUMMM');
    setFavoriteVerses(favoriteVersesInTheChapter({ favorites, book_id: book.id, chapter }));
  }, [book, chapter, favorites]);
  //}, [book, chapter, favorites, favoriteVerses]);

  useEffect(() => {
    setShowFavorite(favoriteVerses.length > 0);
  }, [book, chapter, favoriteVerses]);

  useEffect(() => {
    setVerseAbbs(versesAbbs({ numVerses: numVerses, language: languageValue }));
  }, [numVerses]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter: chapter }));
  }, [chapter, book]);

  useEffect(() => {
    setBible(languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version');
  }, [languageValue]);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const saveFavorites = async (favorites) => {
    try {
      await Storage.setItem(KEY.Favorites, favorites);
    } catch (error) {
      console.error('Failed to save font favorites verse:', error);
    }
  };

  const handleFavorites = () => {
    setShowFavorite(!showFavorite);

    const getCurrentFavorites = handleVersesFavorites({
      favorites,
      book_id: book.id,
      chapter, numVerses,
      removeAll: showFavorite
    })
    dispatch(updateFavorites(getCurrentFavorites));
    saveFavorites(getCurrentFavorites);
  };

  const handleShare = async () => {
    let quote = `${bible}\n`;
    quote += `${book.name[languageValue]} ${chapter}${verseAbbs}`;
    for (const num of numVerses) {
      const text = verses.find((item) => item.verse === num).text;
      const before = numVerses.length > 1 ? `\n${num / 10}. ` : '\n';
      quote += before + text[languageValue];
    };
    try {
      await Share.share({
        message: quote
      });
    } catch (error) {
      console.error('Error sharing:', error);
    };
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerBible}>{bible}</Text>
          <Text style={styles.headerBook}>
            {book.name[languageValue]}
          </Text>
          <View style={styles.headerQuote}>
            <Text style={styles.headerChapter}>
              {chapter}
            </Text>
            <Text style={styles.headerAbbs}>{verseAbbs}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>

          <TouchableOpacity onPress={handleFavorites}>
            <Image
              source={
                showFavorite
                  ? require("../images/heart.png")
                  : verseAbbs !== '' && require("../images/empty.png")
              }
              style={[styles.headerImages, { display: verseAbbs === '' ? 'none' : 'flex' }]}
            />
          </TouchableOpacity>
          {verseAbbs !== '' &&
            <TouchableOpacity onPress={handleShare}>
              <Image
                source={require("../images/share.png")}
                style={styles.headerImages}
              />
            </TouchableOpacity>
          }
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
            />)}
          keyExtractor={(verse) => String(verse.id)}
        />
      </View>
    </View>
  );
};
export default ComponentVerses

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
    alignItems: "center",
    // backgroundColor: 'green',
    justifyContent: 'space-around',
  },
  headerImages: {
    height: 35,
    width: 35,
    // marginHorizontal: 30,
    // paddingHorizontal: 30,
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
    alignContent: 'space-between', // Align to the left
  },
  headerChapter: {
    width: 'auto',
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
    cursor: "pointer",
    paddingBottom: 100,
  },
});
