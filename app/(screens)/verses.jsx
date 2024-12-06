import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import fillVerses from '../utils/fillVerses';
import versesAbbs from '../utils/versesAbbs';
import Verse from "../components/Verse.jsx";

const VersesScreen = () => {

  const languageValue = useSelector(state => state.quote.language);
  const numVerses = useSelector(state => state.quote.numVerses);
  const book = useSelector(state => state.quote.book);
  const chapter = useSelector(state => state.quote.numChapter);
  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const [verses, setVerses] = useState([]);
  const [ShowVersesAbbs, setShowVersesAbbs] = useState('');

  useEffect(() => {
    setShowVersesAbbs(versesAbbs({ numVerses: numVerses, language: languageValue }));
  }, [numVerses])

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter: chapter }));
  }, [chapter])

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <Text style={styles.headerBible}>
        {languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version'}
      </Text>
      <Text style={styles.header}>
        {book.name[languageValue]}
      </Text>
      <Text style={styles.quoteNumbers}>
        {chapter}{ShowVersesAbbs}
      </Text>
      <View style={styles.app}>
        <FlatList
          data={verses}
          numColumns={1}
          renderItem={({ item }) => <Verse verse={item} />}
          keyExtractor={(verse) => String(verse.id)}
        />
      </View>
    </View>
  );
}

export default VersesScreen

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    flex: 1
  },
  headerBible: {
    backgroundColor: '#7dfcd2',
    fontSize: 13,
    paddingTop: 5,
    paddingLeft: 10,
  },
  header: {
    backgroundColor: '#7dfcd2',
    fontSize: 25,
    paddingLeft: 10,
  },
  quoteNumbers: {
    paddingBottom: 5,
    backgroundColor: "#7dfcd2",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  app: {
    cursor: "pointer",
    paddingBottom: 100,
  },
});
