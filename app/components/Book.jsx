import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import getColorByBookType from "../utils/getColorByBookType"

const Book = (props) => {

  const languageValue = useSelector(state => state.quote.language);
  const { book: { testament_id, label, abbreviation, type_id } } = props;
  const bookColor = getColorByBookType(type_id);
  const containerStyles = { backgroundColor: bookColor, ...styles.container };

  return (
    <View style={[containerStyles, testament_id ? styles.withBorder : null]}>
      <Text style={styles.abbreviation}>
        {abbreviation[languageValue]}
      </Text>
      <Text style={styles.label}>
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
  abbreviation: {
    fontSize: 20
  },
  label: {
    fontSize: 6
  },
});
