import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import getColorByBookType from "../utils/getColorByBookType"
import { updateBook } from "../redux/quoteSlice";

const Book = (props) => {

  const { book } = props;

  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const navigation = useNavigation();

  const bookColor = book.type_id ? getColorByBookType(book.type_id) : 'none';
  const containerStyles = { backgroundColor: bookColor, ...styles.container };

  const abbreviationFont = [, , , 25, 24, 22, 20];
  const nameFont = [, , , 14, 9, 7, 6];

  const goToChapters = () => {
    dispatch(updateBook(book));
    navigation.navigate("chapters", book);
  };

  return (
    <TouchableWithoutFeedback onPress={book.testament_id ? goToChapters : null}>
      <View style={[containerStyles, book.testament_id ? styles.withBorder : styles.noShow]} >
        <Text style={{ fontSize: abbreviationFont[bookColumnsValue] }}>
          {book.abbreviation[languageValue]}
        </Text>
        <Text style={{ fontSize: nameFont[bookColumnsValue] }}>
          {book.name[languageValue]}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  withBorder: {
    cursor: 'pointer',
    borderWidth: 1,
  },
  noShow: {
    backgroundColor: 'transparent',
  }
});
