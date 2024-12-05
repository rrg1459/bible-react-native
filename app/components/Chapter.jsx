import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";

const Chapter = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { chapter } = props;

  const goToChapters = () => {
    dispatch(updateChapter(chapter.id));
    navigation.navigate("verses");
  };

  return (
    <TouchableWithoutFeedback onPress={chapter.show ? goToChapters : null}>
        <Text style={[styles.container, chapter.show ? styles.withBorder : null]}>
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
    fontSize:30,
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  withBorder: {
    cursor: 'pointer',
    backgroundColor: 'green',
    borderWidth: 1,
  },
});
