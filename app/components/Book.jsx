import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import getColorByBookType from "../utils/getColorByBookType"

const Book = (props) => {

  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const navigation = useNavigation();

  // const { book: { testament_id, label, abbreviation, type_id } } = props;
  const { book } = props;
  const bookColor = getColorByBookType(book.type_id);
  const containerStyles = { backgroundColor: bookColor, ...styles.container };

  const abbreviationFont = [, , , 25, 24, 22, 20];
  const labelFont = [, , , 14, 9, 7, 6];

  const goToChapters = () => {
    navigation.navigate("chapters", book);
  };

  return (
    <TouchableWithoutFeedback onPress={goToChapters}>
      <View style={[containerStyles, book.testament_id ? styles.withBorder : null]} >
        <Text style={{ fontSize: abbreviationFont[bookColumnsValue] }}>
          {book.abbreviation[languageValue]}
        </Text>
        <Text style={{ fontSize: labelFont[bookColumnsValue] }}>
          {book.label[languageValue]}
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
    cursor: 'pointer',
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  withBorder: {
    borderWidth: 1,
  },
});
