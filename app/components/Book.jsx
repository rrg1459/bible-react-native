import { StyleSheet, Text, View } from "react-native";
import getColorByBookType from "../utils/getColorByBookType"
// import { IfBook } from "../utils/Interfaces"

const Index = (props) => {
  // const Index: React.FC<IfBook> = (props) => {

  const { book: { testament_id, label, abbreviation, type_id } } = props;
  const bookColor = getColorByBookType(type_id);
  const containerStyles = { backgroundColor: bookColor, ...styles.container };

  return (
    <View style={[containerStyles, testament_id ? styles.withBorder : null]}>
      <Text style={styles.abbreviation}>
        {abbreviation[1]}
      </Text>
      <Text style={styles.label}>
        {label[1]}
      </Text>
    </View>
  );
}

export default Index;

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
