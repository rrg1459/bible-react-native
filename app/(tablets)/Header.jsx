import { StyleSheet, Text, View } from "react-native";

const TabletHeader = () => {

  return (
    <View style={styles.main}>
      <Text>Tablet Header</Text>
    </View>
  );
};
export default TabletHeader

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});