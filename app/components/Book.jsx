import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateBook, updateChapter, loadingVerses } from "../redux/quoteSlice";
import { useNavigation } from "expo-router";
import getColorByBookType from "../utils/getColorByBookType"
import { saveItem } from "../utils/setItems";

const Book = ({ book, type, bookFavorite, isNotCurrentBook }) => {

  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const typeIdValue = useSelector(state => state.quote.type_id);
  const navigation = useNavigation();

  const bookColor = useMemo(() => book.type_id ? getColorByBookType(book.type_id) : 'none', [book.type_id]);
  const typeName = useMemo(() => bookColumnsValue > 3 ? type?.substr(0, 4) : type, [type, bookColumnsValue]);

    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
      dispatch(loadingVerses(isPressed ? true : false));
    }, [isPressed, dispatch]);

    const containerStyles = useMemo(() => {
    const currentBookBorderStyle = isNotCurrentBook
    ? { borderStyle: 'solid', borderColor: "#fff" }
    : { borderStyle: 'dashed', borderColor: "#000" };
    return {backgroundColor: bookColor, ...currentBookBorderStyle, ...styles.container}
  }, [bookColor, isNotCurrentBook]);

  const heartColor = useMemo(() => ([,
      '💛', // pentateuch
      '💛', // historicals
      '❤️', // poetics
      '❤️', //  prophetics
      '❤️', // gospels
      '❤️', // facts
      '❤️', //  letters
      '💛', // revelation
    ][book.type_id]
  ), [book.type_id]);

  const chaptersStyles = useMemo(() => {
    //   1 2  3   4   5   6          11
    const paddingValue =  typeIdValue < 9
    ? [, , , 17, 15, 10, 12, , , , , 26][bookColumnsValue]
    : [, , , 29, 26, 10, 12, , , , , 26][bookColumnsValue]
    const fontSizeValue = [, 12, 10, 10, 10,  9,  9, , , , , 11][bookColumnsValue]
    return { paddingTop: paddingValue, fontSize: fontSizeValue, }
  }, [bookColumnsValue, typeIdValue]);

  const favoriteStyles = useMemo(() => ({
    position: 'absolute',
               // 1  2  3  4  5  6         11
    fontSize: [, 10, 8, 8, 8, 6, 6, , , , , 8][bookColumnsValue],
    top:      [,  5, 3, 2, 2, 0, 1, , , , , 3][bookColumnsValue],
    left:     [,  8, 8, 6, 4, 2, 3, , , , , 5][bookColumnsValue],
  }), [bookColumnsValue]);

  const fontTypeNameStyles = useMemo(() => ({
    top: bookColumnsValue === 11 ? 1 :  5,
    right: bookColumnsValue === 11 ? 5 :  5,
    fontSize: [, 14, 12, 11, 11, 9, 8][bookColumnsValue]
  }), [bookColumnsValue]);

  const colorTypeNameStyles = useMemo(() => ({ color: [1, 6, 8].includes(book.type_id) ? 'white' : 'black' }), [book.type_id]);

  const fontAbbrNameStyles = useMemo(() => {
    let padding = {};
    switch (bookColumnsValue) {
      case 3:
      case 4:
        padding = typeIdValue > 8 ? { paddingTop: 15 } : { paddingTop: 2 };
        break;
      case 6:
        padding = { paddingVertical: 6 };
        break;
      case 11:
        padding = { paddingTop:20};
        break;
      default:
        padding = {};
    }
    return { ...padding, fontSize: [, , 29, 25, 22, 20, 16, , , , , 19][bookColumnsValue] }
  }, [bookColumnsValue, typeIdValue]);

  const bookNameStyles = useMemo(() => {
    let padding = {};
    switch (bookColumnsValue) {
      case 1:
        padding = typeIdValue > 8 ? { paddingTop: 16 } : { paddingVertical: 8 };
        break;
      case 2:
        padding = typeIdValue > 8 ? { paddingTop: 20 } : { paddingVertical: 10 };
        break;
      case 11:
        padding = { paddingTop: 3 };
        break;
      default:
        padding = {};
    }
    return { ...padding, fontSize: [, 28, 18, 12, 10, 8, 4, , , , , 12][bookColumnsValue] };
  }, [bookColumnsValue, typeIdValue]);

  const goToChapters = useCallback(() => {
    dispatch(updateBook(book));
    saveItem({ Book: book });
    if (isNotCurrentBook) dispatch(updateChapter(null));
    if (bookColumnsValue !== 11) navigation.navigate("chapters", book);
  }, [dispatch, navigation, book, isNotCurrentBook, bookColumnsValue]);

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={book.testament_id ? goToChapters : null}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={[containerStyles, book.testament_id ? styles.withBorder : styles.noShow]} >
        {bookFavorite && <Text style={favoriteStyles}>{heartColor}</Text>}
        {((bookColumnsValue < 5 || bookColumnsValue === 11) && typeIdValue > 8) &&
          <Text style={[styles.type, fontTypeNameStyles, colorTypeNameStyles]}>{typeName}</Text>
        }
        {bookColumnsValue > 2 &&
          <View style={{ flexDirection: 'row' }}>
            <Text style={fontAbbrNameStyles}>{book.abbreviation[languageValue]}</Text>
            {book.chapters !== null &&
              <Text style={chaptersStyles}> ({book.chapters})</Text>
            }
          </View>
        }
        {(bookColumnsValue < 6 || bookColumnsValue === 11) && (
          <Text numberOfLines={1} style={bookNameStyles}>
            {book.name[languageValue]}
            {bookColumnsValue < 3 && book.chapters !== null && (
              <Text style={chaptersStyles}> ({book.chapters})</Text>
            )}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 5,
  },
  type: {
    position: 'absolute',
    fontStyle: 'italic',
  },
  withBorder: {
    cursor: 'pointer',
    borderWidth: 1,
  },
  noShow: {
    backgroundColor: 'transparent',
  }
});
