import { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateVerses } from "../redux/quoteSlice";
import cleanAndTidy from "../utils/cleanAndTidy";

const Verse = (props) => {

  const dispatch = useDispatch();
  const { verse } = props;
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const numVerses = useSelector(state => state.quote.numVerses);
  const [currentVerse, setCurrentVerse] = useState(false);
  
  const onPressVerse = () => {
    dispatch(
      updateVerses(
        cleanAndTidy({verses: numVerses, verse: verse.verse, remove: currentVerse})
      )
    );
    setCurrentVerse(!currentVerse);
  };

  return (
    <TouchableWithoutFeedback onPress={onPressVerse}>
        <Text style={[{fontSize: fontSizeVerse}, styles.container, currentVerse ? styles.currentVerse : null]}>
          {verse.verse}. {verse.text[languageValue]}
        </Text>
    </TouchableWithoutFeedback>
  );
}
export default Verse;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // textAlign: "center",
    // fontSize:30,
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  currentVerse: {
    backgroundColor: "#E2FDF4",
  },
});
