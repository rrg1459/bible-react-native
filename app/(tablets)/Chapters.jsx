import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateChapter, updateVerses } from '../redux/quoteSlice';
import Chapter from "./Chapter.jsx";
import favoriteChaptersInTheBook from '../utils/favoriteChaptersInTheBook.js';
import fillChapters from "../utils/fillChapters.js";
import tabletChapterStyles from "../utils/tabletChapterStyles.js";
import empty from "../utils/emptyObject.js";
import { saveItem } from "../utils/setItems";

const ComponentChapters = () => {
  const languageValue = useSelector(state => state.quote.language);
  const book = useSelector(state => state.quote.book);
  const currentChapter = useSelector(state => state.quote.numChapter);
  const favorites = useSelector(state => state.quote.favorites);
  const dispatch = useDispatch();
  const { chapters } = book;
  const [chaptersVector, setChaptersVector] = useState([]);
  const [favoriteChapters, setFavoriteChapters] = useState([]);
  const [chapterStyles, setChapterStyles] = useState({});

  useEffect(() => {
    setChapterStyles(tabletChapterStyles(chapters));
  }, [chapters])

  useEffect(() => {
    setFavoriteChapters(favoriteChaptersInTheBook({ favorites, book_id: book.id }));
  }, [book, favorites]);

  useEffect(() => {
    if (empty(chapterStyles) === true) return;
    setChaptersVector(
      fillChapters({
        screen: 'chapters',
        chapters: chapters,
        columnsValue: chapterStyles.columns,
      }));
  }, [chapters, chapterStyles]);

  useFocusEffect(
    useCallback(() => {
      dispatch(updateVerses([]));
      if (currentChapter !== null) return;
      dispatch(updateChapter(1));
      saveItem({ Chapter: 1 });
    }, [currentChapter, dispatch])
  );

  const [innerHeight, setInnerHeight] = useState(0);

  const onInnerLayout = event => {
    const { height } = event.nativeEvent.layout;
    setInnerHeight(height);
  };

    if (chaptersVector.length === 0) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large' color='blue' />
        </View>
      );
    }

  return (
    <View style={styles.main} onLayout={onInnerLayout}>
      <View style={styles.chapters}>
        <FlatList
          data={chaptersVector}
          numColumns={chapterStyles.columns}
          key={chapterStyles.columns}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chapter
              chapter={item}
              chapterFavorite={favoriteChapters.includes(item.id)}
              amountChapters={chaptersVector.length}
              isCurrentChapter={currentChapter === item.id ? true : false}
              language={languageValue}
              innerHeight={innerHeight}
              oneChapter={chapters === 1 ? true : false}
              chapterStyles={chapterStyles}
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
    backgroundColor: '',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
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
    flex: 1,
    marginHorizontal: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});