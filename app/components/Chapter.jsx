import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";

const Chapter = ({ chapter, columnsValue, amountChapters, chapterFavorite }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const columns = { fontSize: columnsValue === 6 && amountChapters > 99 ? 16 : 22 };

  const fontSizeFavorite = [, , , , 12, 10, 9];
  const topFontFavorite = [, , , , 1, 0, 0];
  const topLeftFavorite = [, , , , 4, 3, 3];

  const goToVerses = () => {
    dispatch(updateChapter(chapter.id));
    navigation.navigate("verses");
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={chapter.show ? goToVerses : null}>
      <View style={[styles.container, columns, chapter.show ? styles.withBorder : null]}>
        {chapterFavorite &&
          <Text style={{
            color: '#4278f5',
            position: 'absolute',
            fontSize: fontSizeFavorite[columnsValue],
            top: topFontFavorite[columnsValue],
            left: topLeftFavorite[columnsValue],
          }}>
            ★
          </Text>
        }

        <Text style={styles.id}>
          {chapter.show && chapter.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 4,
    borderRadius: 5,
    borderColor: "#fff"
  },
  id: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
  },
  withBorder: {
    cursor: 'pointer',
    borderWidth: 1,
    backgroundColor: '#e8e8e8',
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingVertical: 8,
    color: '#090909',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 17, // For Android shadow, little box inside
  },
  image: {
    height: 21,
    width: 21,
  },
  favorite: {
    color: '#4278f5',
    position: 'absolute',
  }
});
