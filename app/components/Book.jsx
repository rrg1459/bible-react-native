import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import getColorByBookType from "../utils/getColorByBookType"

const Book = (props) => {

  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const { book: { testament_id, label, abbreviation, type_id } } = props;
  const bookColor = getColorByBookType(type_id);
  const containerStyles = { backgroundColor: bookColor, ...styles.container };

  const abbreviationFont = [,,,25,24,22,20];
  const labelFont = [,,,14,9,7,6];

  return (
    <View style={[containerStyles, testament_id ? styles.withBorder : null]}>
      <Text style={{fontSize: abbreviationFont[bookColumnsValue]}}>
        {abbreviation[languageValue]}
      </Text>
      <Text style={{fontSize: labelFont[bookColumnsValue]}}>
        {label[languageValue]}
      </Text>
    </View>
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
    borderWidth: 1,
  },
});
