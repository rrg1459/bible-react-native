import { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateVerses } from "../redux/quoteSlice";
import cleanAndTidy from "../utils/cleanAndTidy";

const Verse = (props) => {

  const dispatch = useDispatch();
  const { verse, verseFavorite } = props;
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const numVerses = useSelector(state => state.quote.numVerses);
  const [currentVerse, setCurrentVerse] = useState(false);

  const onPressVerse = () => {
    dispatch(
      updateVerses(
        cleanAndTidy({ verses: numVerses, verse: verse.verse, remove: currentVerse })
      )
    );

    // if (!verseFavorite) {
    //   dispatch(
    //     updateFavorites(
    //       handleOneFavorite({ favorites: favorites, verse: verse, remove: currentVerse })
    //     )
    //   );
    // };
    setCurrentVerse(!currentVerse);
  };

  return verse.verse === 0
    ? verse.text[languageValue] !== ''
      ? <Text style={[{ fontSize: fontSizeVerse }, styles.title]}>
        {verse.text[languageValue]}
        </Text>
      : null
    : Number.isInteger(verse.verse / 10)
      ? <TouchableWithoutFeedback onPress={onPressVerse}>
          <Text style={[{ fontSize: fontSizeVerse }, styles.container, currentVerse ? styles.currentVerse : null]}>
            {verseFavorite && <Text style={{ color: '#4278f5', }}>★ </Text>}
            {verse.text[languageValue] !== '' && verse.verse / 10}. {verse.text[languageValue]}
          </Text>
        </TouchableWithoutFeedback>
      : <Text style={[{ fontSize: fontSizeVerse }, languageValue === 1 ? { fontWeight: 'bold' } : null, styles.Subtitle]}>
          {verse.text[languageValue]}
        </Text>
}
export default Verse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  title: {
    marginTop: 10,
    fontWeight: "300",
    fontStyle: "italic",
    textAlign: "center",
  },
  Subtitle: {
    marginTop: 10,
    textAlign: "center",
  },
  currentVerse: {
    backgroundColor: "#E2FDF4",
  },
});
