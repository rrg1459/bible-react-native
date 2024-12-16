import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { changeScreen, updateVerses } from '../redux/quoteSlice';
import fillChapters from "../utils/fillChapters.js";
import { FlatList } from 'react-native';
import Chapter from "../components/Chapter.jsx";

const ComponentChapters = () => {

  const languageValue = useSelector(state => state.quote.language);
  const chapterColumnsValue = useSelector(state => state.quote.chapterColumns);
  const book = useSelector(state => state.quote.book);
  const dispatch = useDispatch();
  const { chapters, name } = book;
  const route = useRoute();
  const ScreenName = route.name;
  const [chaptersVector, setChaptersVector] = useState([]);

  useEffect(() => {
    setChaptersVector(
      fillChapters({
        screen: ScreenName,
        chapters: chapters,
        columnsValue: chapterColumnsValue
      }));
  }, [chapters, chapterColumnsValue]);

  useFocusEffect(() => {
    dispatch(updateVerses([]));
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <View style={styles.header}>
        <Text style={styles.headerBible}>
          {languageValue ?
            'Santa Biblia Reina Valera'
            : 'Holy Bible King James Version'
          }
        </Text>
        <Text style={styles.headerBook}>
          {name[languageValue]}
        </Text>
        <Text style={styles.headerQuote}>
          {chapters} {languageValue ?
            'Capítulo' : 'Chapter'}{chapters > 1 ? 's' : ''
          }
        </Text>
      </View>
      <View style={styles.chapters}>
        <FlatList
          data={chaptersVector}
          numColumns={chapterColumnsValue}
          key={chapterColumnsValue}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chapter
              chapter={item}
              columnsValue={chapterColumnsValue}
              amountChapters={chaptersVector.length}
            />)}
          keyExtractor={(chapter) => String(chapter.id)}
        />
      </View>
    </View>
  );
};
export default ComponentChapters

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
    paddingBottom: 5,
    backgroundColor: '#7dfcd2',
    fontStyle: 'italic',
    fontSize: 12,
  },
  chapters: {
    flex: 4, // the number of columns you want to devide the screen into
    paddingTop: 5,
    marginHorizontal: "auto",
    width: "98%",
    paddingBottom: 5,
  },
});