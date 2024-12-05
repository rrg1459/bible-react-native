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
      <Text style={styles.header}>
        {book.label[languageValue]} {chapter}{ShowVersesAbbs}{/* imrpove this*/}
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
  header: {
    backgroundColor: '#7dfcd2',
    fontSize: 25,
    // padding: 5,
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
  app: {
    cursor: "pointer",
    // marginHorizontal: "auto",
    // width: "98%"
  },
});
