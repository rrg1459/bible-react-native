import { StyleSheet, Text, View } from "react-native";

const TabletFooter = () => {

  return (
    <View style={styles.main}>
      <Text>Tablet Footer</Text>
    </View>
  );
};
export default TabletFooter

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});