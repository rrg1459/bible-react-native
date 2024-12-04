import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "expo-router";

const Chapter = (props) => {

  const navigation = useNavigation();

  const { chapter } = props;

  const goToChapters = () => {
    navigation.navigate("verses", chapter);
  };

  return (
    <TouchableWithoutFeedback onPress={goToChapters}>
        <Text style={styles.container}>
          {chapter.show ? chapter.id : ''}
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
    fontSize:30,
    cursor: 'pointer',
    backgroundColor: 'green',
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  withBorder: {
    borderWidth: 1,
  },
});
