import { useCallback, useEffect, useState } from 'react';
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites, updateRetrieveFavorites } from '../redux/quoteSlice';

import handleVersesFavorites from '../utils/handleVersesFavorites';
import versesAbbs from '../utils/versesAbbs';
import fillVerses from '../utils/fillVerses';
import isChapterWithFavorites from '../utils/isChapterWithFavorites';
import { saveItem } from "../utils/setItems";

const Header = () => {
  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const numVerses = useSelector(state => state.quote.numVerses);
  const favorites = useSelector(state => state.quote.favorites);
  const chapter = useSelector(state => state.quote.numChapter);
  const book = useSelector(state => state.quote.book);

  const [verses, setVerses] = useState([]);
  const [verseAbbs, setVerseAbbs] = useState('');
  const [bible, setBible] = useState('');
  const [showFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    setBible(languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version');
  }, [languageValue]);

  useEffect(() => {
    setShowFavorite(isChapterWithFavorites(favorites, book, chapter));
  }, [favorites, book, chapter]);

  useEffect(() => {
    setVerseAbbs(versesAbbs({ numVerses, language: languageValue }));
  }, [numVerses, languageValue]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter }));
  }, [book.id, chapter]);

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
    dispatch(updateRetrieveFavorites(updatedFavorites));
    saveItem({ Favorites: updatedFavorites });
  }, [favorites, book.id, chapter, numVerses, showFavorite, dispatch]);

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
        {verseAbbs !== '' && (
          <TouchableOpacity onPress={handleShare}>
            <Image
              source={require('../images/share.png')}
              style={styles.headerImages}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleFavorites}>
          <Image
            source={showFavorite ? require('../images/heart.png') : require('../images/empty.png')}
            style={[styles.headerImages, { display: verseAbbs || showFavorite ? 'flex' : 'none' }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
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
    justifyContent: 'flex-end',
  },
  headerImages: {
    height: 35,
    width: 35,
    marginRight: 30,
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
})