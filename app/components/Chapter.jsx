import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";

const Chapter = ({ chapter, columnsValue, amountChapters }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const columns = { fontSize: columnsValue === 6 && amountChapters > 99 ? 16 : 22 };

  const goToVerses = () => {
    dispatch(updateChapter(chapter.id));
    navigation.navigate("verses");
  };

  return (
    <TouchableWithoutFeedback onPress={chapter.show ? goToVerses : null}>
      <Text style={[styles.container, columns, chapter.show ? styles.withBorder : null]}>
        {chapter.show && chapter.id}
      </Text>
    </TouchableWithoutFeedback>
  );
}
export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    padding: 8,
    margin: 4,
    borderRadius: 5,
    borderColor: "#fff"
  },
  withBorder: {
    cursor: 'pointer',
    backgroundColor: '#e8e8e8',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    color: '#090909',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10, // For Android shadow
  },
});
