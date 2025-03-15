import React, { useMemo, useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";

const Chapter = ({
  chapter,
  columnsValue,
  amountChapters,
  chapterFavorite,
  isCurrentChapter,
  language
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const columnsStyles = useMemo(() => ({
    justifyContent: "center",
    textAlign: "center",
    fontSize: columnsValue === 6 && amountChapters > 99 ? 16 : 22,
  }), [columnsValue, amountChapters]);

  const favoriteStyles = useMemo(() => ({
    color: '#4278f5',
    position: 'absolute',
    fontSize: [, , , , 8, 7, 6][columnsValue],
    top:      [, , , , 2, 1, 1][columnsValue],
    left:     [, , , , 5, 4, 4][columnsValue],
  }), [columnsValue]);

  const imageStyles = useMemo(() => ({
    width:  [, , , , 24, 22, 18][columnsValue],
    height: [, , , , 19, 19, 18][columnsValue],
  }), [columnsValue]);

  const textImageStyles = useMemo(() => ({
    color: 'blue',
    fontSize: [, , , , 9, 9, 6][columnsValue],
    fontStyle: 'italic',
  }), [columnsValue]);

  const goToVerses = useCallback(() => {
    dispatch(updateChapter(chapter.id));
    navigation.navigate("verses");
  }, [dispatch, navigation, chapter.id]);

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={chapter.show ? goToVerses : null}>
      {({ pressed }) => (
        pressed
          ?
          <View style={[styles.containerImage, chapter.show ? styles.withBorderImage : styles.noShow]}>
            <Image
              source={require('../images/wind.png')}
              style={imageStyles}
            />
            <Text style={textImageStyles}>{language ? 'Cargando' : 'Loading'}</Text>
          </View>
          :
          <View style={[styles.container, chapter.show ? styles.withBorder : null]}>
            {chapterFavorite && <Text style={favoriteStyles}>❤️</Text>}
            <Text style={[columnsStyles, isCurrentChapter ? styles.currentChapter : null]}>
              {chapter.show && chapter.id}
            </Text>
          </View>
      )}
    </Pressable>
  );
};
export default Chapter;

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    padding: 8,
    margin: 4,
    opacity: 0.5,
    borderRadius: 5,
    border: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 8,
    margin: 4,
    borderRadius: 5,
    borderColor: "#fff",
  },
  withBorderImage: {
    borderWidth: 1,
    backgroundColor: '#e8e8e8',
    borderColor: 'grey',
    borderRadius: 8,
    paddingVertical: 8,
    color: '#090909',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 17, // For Android shadow, little box inside
  },
  withBorder: {
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
  noShow: {
    display: 'none',
  },
  currentChapter: {
    fontStyle: 'italic',
    color: 'blue',
  },
});