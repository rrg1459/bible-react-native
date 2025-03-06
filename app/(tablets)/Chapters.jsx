import { StyleSheet, FlatList, View } from "react-native";
import Chapter from "../components/Chapter";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fillChapters from "../utils/fillChapters.js";

const TabletChapters = () => {
  const languageValue = useSelector(state => state.quote.language);
  const chapterColumnsValue = useSelector(state => state.quote.chapterColumns);
  const book = useSelector(state => state.quote.book);
  const { chapters } = book;

  const [chaptersVector, setChaptersVector] = useState([]);

  useEffect(() => {
    setChaptersVector(
      fillChapters({
        screen:  'chapters',
        chapters: chapters,
        columnsValue: chapterColumnsValue
      }));
  }, [chapters, chapterColumnsValue]);

  return (
    <View style={styles.main}>
      <View style={styles.chapters}>
      <FlatList
          data={chaptersVector}
          numColumns={11}
          key={chapterColumnsValue}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chapter
              chapter={item}
              chapterFavorite={false}
              columnsValue={chapterColumnsValue}
              amountChapters={chaptersVector.length}
              // isCurrentChapter={false}
              language={languageValue}
            />)}
          keyExtractor={(chapter) => String(chapter.id)}
        />
      </View>
    </View>
  );
};
export default TabletChapters

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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