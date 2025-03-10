import React, { useMemo, useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateChapter } from "../redux/quoteSlice";
import { saveItem } from "../utils/setItems";

const Chapter = ({
  chapter,
  innerHeight,
  chapterStyles,
  oneChapter,
  chapterFavorite,
  isCurrentChapter,
  language }) => {
  const dispatch = useDispatch();
  const { columns, rows, chapterFontSize, adjustHeight } = chapterStyles;
  const favoriteStyles = useMemo(() => ({
    color: '#4278f5',
    position: 'absolute',
    fontSize: [,18,14,14,10,10,8,8,8,8,8,8][columns],
    top:      [, 3, 3, 3, 3, 3,2,3,2,2,2,2][columns],
    left:     [, 7, 7, 7, 7, 5,4,5,4,4,4,4][columns],
  }), [columns]);

  const imageStyles = useMemo(() => ({
    width:  [,44,36,24,20,20,16,16,16,16,16,16][columns],
    height: [,39,26,19,15,15,14,14,14,14,14,14][columns],
  }), [columns]);

  const textImageStyles = useMemo(() => ({
    color: 'blue',
    fontSize: [,18,18,14,12,12,10, 9, 9, 8, 8, 8][columns],
    fontStyle: 'italic',
  }), [columns]);

  const goToVerses = useCallback(() => {
    dispatch(updateChapter(chapter.id));
    saveItem({ Chapter: chapter.id});
  }, [dispatch, chapter.id]);

  const styleFLex = oneChapter ? null: { flex: 1 };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={chapter.show ? goToVerses : null}>
      {({ pressed }) => (
        pressed
          ?
          <View style={[styleFLex, styles.containerImage, chapter.show ? styles.withBorderImage : styles.noShow, { height: ((innerHeight / rows) - adjustHeight) }]}>
            <Image
              source={require('../images/wind.png')}
              style={imageStyles}
            />
            <Text style={textImageStyles}>{language ? 'Cargando' : 'Loading'}</Text>
          </View>
          :
          <View style={[styleFLex, styles.container, chapter.show ? styles.withBorder : null, { height: ((innerHeight / rows) - adjustHeight) }]}>
            {chapterFavorite && <Text style={favoriteStyles}>❤️</Text>}
            <Text style={[isCurrentChapter ? styles.currentChapter : null, {fontSize: chapterFontSize}]}>
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
    justifyContent: 'center',
    alignItems: 'center',
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