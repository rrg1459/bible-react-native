import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateVerses } from "../redux/quoteSlice";
import cleanAndTidy from "../utils/cleanAndTidy";

const Verse = ({ verse, verseFavorite }) => {
  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const numVerses = useSelector(state => state.quote.numVerses);
  const [currentVerse, setCurrentVerse] = useState(false);

  // Memoize verse text to avoid recalculations
  const verseText = useMemo(() => verse.text[languageValue], [verse.text, languageValue]);

  // Handle verse press
  const onPressVerse = useCallback(() => {
    dispatch(
      updateVerses(
        cleanAndTidy({ verses: numVerses, verse: verse.verse, remove: currentVerse })
      )
    );
    setCurrentVerse(prev => !prev);
  }, [dispatch, numVerses, verse.verse, currentVerse]);

  // if (!verseFavorite) {
  //   dispatch(
  //     updateFavorites(
  //       handleOneFavorite({ favorites: favorites, verse: verse, remove: currentVerse })
  //     )
  //   );
  // };

  // Render verse based on its attributes
  return (
    verse.verse === 0 ? (
      verseText !== '' && (
        <Text style={[{ fontSize: fontSizeVerse  - 2}, styles.title]}>
          {verseText}
        </Text>
      )
    ) : Number.isInteger(verse.verse / 10) ? (
      <TouchableWithoutFeedback onPress={onPressVerse}>
        <Text style={[{ fontSize: fontSizeVerse }, styles.container, currentVerse && styles.currentVerse]}>
          {verseFavorite && <Text style={{ color: '#4278f5' }}>★ </Text>}
          {verseText !== '' && verse.verse / 10}. {verseText}
        </Text>
      </TouchableWithoutFeedback>
    ) : (
      <Text style={[{ fontSize: fontSizeVerse }, languageValue === 1 && { fontWeight: 'bold' }, styles.subtitle]}>
        {verseText}
      </Text>
    )
  );
};

export default Verse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff",
  },
  title: {
    marginTop: 10,
    fontWeight: "300",
    fontStyle: "italic",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
  },
  currentVerse: {
    backgroundColor: "#E2FDF4",
  },
});