import React, { useMemo, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";

const Chapter = ({ chapter, columnsValue, amountChapters, chapterFavorite }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Memoize styles based on columns value and amount of chapters
  const columnsStyles = useMemo(() => ({
    justifyContent: "center",
    textAlign: "center",
    fontSize: columnsValue === 6 && amountChapters > 99 ? 16 : 22,
  }), [columnsValue, amountChapters]);

  const favoriteStyles = useMemo(() => ({
    color: '#4278f5',
    position: 'absolute',
    fontSize: [, , , , 16, 14, 12][columnsValue],
    top: [, , , , 1, 0, 0][columnsValue],
    left: [, , , , 5, 3, 3][columnsValue],
  }), [columnsValue]);

  const goToVerses = useCallback(() => {
    dispatch(updateChapter(chapter.id));
    navigation.navigate("verses");
  }, [dispatch, navigation, chapter.id]);

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#d2e6ff' : null },
        { flex: 1 },
      ]}
      onPress={chapter.show ? goToVerses : null}>
      <View style={[styles.container, chapter.show ? styles.withBorder : null]}>
        {chapterFavorite && <Text style={favoriteStyles}>★</Text>}
        <Text style={columnsStyles}>
          {chapter.show && chapter.id}
        </Text>
      </View>
    </Pressable>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 4,
    borderRadius: 5,
    borderColor: "#fff",
  },
  withBorder: {
    cursor: 'pointer',
    borderWidth: 1,
    backgroundColor: '#e8e8e8',
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingVertical: 8,
    color: '#090909',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 17, // For Android shadow, little box inside
  },
});