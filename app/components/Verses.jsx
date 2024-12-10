import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import fillVerses from '../utils/fillVerses';
import versesAbbs from '../utils/versesAbbs';
import Verse from "../components/Verse.jsx";

const ComponentVerses = () => {

  const languageValue = useSelector(state => state.quote.language);
  const numVerses = useSelector(state => state.quote.numVerses);
  const book = useSelector(state => state.quote.book);
  const chapter = useSelector(state => state.quote.numChapter);
  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const [verses, setVerses] = useState([]);
  const [verseAbbs, setVerseAbbs] = useState('');

  useEffect(() => {
    setVerseAbbs(versesAbbs({ numVerses: numVerses, language: languageValue }));
  }, [numVerses]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter: chapter }));
  }, [chapter]);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <View style={styles.header}>
        <Text style={styles.headerBible}>
          {languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version'}
        </Text>
        <Text style={styles.headerBook}>
          {book.name[languageValue]}
        </Text>
        <View style={styles.headerQuote}>
          <Text style={styles.headerChapter}>
            {chapter}
          </Text>
          {versesAbbs && <Text style={styles.headerAbbs}>{verseAbbs}</Text>}
        </View>
      </View>
      <View style={styles.verses}>
        <FlatList
          data={verses}
          numColumns={1}
          renderItem={({ item }) => <Verse verse={item} />}
          keyExtractor={(verse) => String(verse.id)}
        />
      </View>
    </View>
  );
};
export default ComponentVerses

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    flex: 1
  },
  header: {
    backgroundColor: '#7dfcd2',
    paddingLeft: 10,
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
