import { StyleSheet, Text, View } from "react-native";

const TabletBooks = () => {

  return (
    <View style={styles.main}>
      <Text>Tablet Books</Text>
    </View>
  );
};
export default TabletBooks

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});