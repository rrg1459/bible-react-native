import { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateBook, updateChapter } from "../redux/quoteSlice";
import { useNavigation } from "expo-router";
import getColorByBookType from "../utils/getColorByBookType"

const Book = ({ book, type, bookFavorite, isNotCurrentBook }) => {

  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const typeIdValue = useSelector(state => state.quote.type_id);
  const navigation = useNavigation();

  const bookColor = useMemo(() => book.type_id ? getColorByBookType(book.type_id) : 'none', [book.type_id]);
  const typeName = useMemo(() => bookColumnsValue > 3 ? type?.substr(0, 4) : type, [type, bookColumnsValue]);
  const containerStyles = useMemo(() => ({ backgroundColor: bookColor, ...styles.container }), [bookColor]);
  const favoriteStyles = useMemo(() => ({
    position: 'absolute',
    fontSize: [, 18, 20, 17, 14, 10, 8][bookColumnsValue],
    top:      [, 10,  3,  2,  1,  0, 1][bookColumnsValue],
    left:     [, 16,  8,  6,  4,  2, 3][bookColumnsValue],
    color: [,
      '#FFE5B4', // pentateuch
      '#ffff00', // historicals
      '#f54242', // poetics
      '#20842B', //  prophetics
      '#ED7117', // gospels
      '#42f5f5', // facts
      '#4242f5', //  letters
      '#000000', // revelation
    ][book.type_id]
  }), [bookColumnsValue, book.type_id]);
  const fontTypeNameStyles = useMemo(() => ({ fontSize: [, 14, 12, 11, 11, 9, 8][bookColumnsValue] }), [bookColumnsValue]);
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
      default:
        padding = {};
    }
    return { ...padding, fontSize: [,, 29, 25, 22, 20, 16][bookColumnsValue] }
  }, [bookColumnsValue, typeIdValue]);


  const fontBookNameStyles = useMemo(() => {
    let padding = {};
    switch (bookColumnsValue) {
      case 1:
        padding = typeIdValue > 8 ? { paddingTop: 16 } : { paddingVertical: 8 };
        break;
      case 2:
        padding = typeIdValue > 8 ? { paddingTop: 20 } : { paddingVertical: 10 };
        break;
      default:
        padding = {};
    }
    return { ...padding, fontSize: [, 28, 18, 10, 7, 5, 4][bookColumnsValue] };
  }, [bookColumnsValue, typeIdValue]);

  const goToChapters = useCallback(() => {
    dispatch(updateBook(book));
    if (isNotCurrentBook) dispatch(updateChapter(null));
    if (bookColumnsValue !== 11) navigation.navigate("chapters", book);
  }, [dispatch, navigation, book, isNotCurrentBook, bookColumnsValue]);

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={book.testament_id ? goToChapters : null}>
      <View style={[containerStyles, book.testament_id ? styles.withBorder : styles.noShow]} >
        {bookFavorite && <Text style={favoriteStyles}>★</Text>}
        {bookColumnsValue > 2 &&
          <Text style={fontAbbrNameStyles}>{book.abbreviation[languageValue]}</Text>
        }
        {bookColumnsValue < 5 && typeIdValue > 8 &&
          <Text style={[styles.type, fontTypeNameStyles, colorTypeNameStyles]}>{typeName}</Text>
        }
        {bookColumnsValue < 6 &&
          <Text style={fontBookNameStyles}>{book.name[languageValue]}</Text>
        }
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
    padding: 4,
    margin: 2,
    borderRadius: 5,
    borderColor: "#fff"
  },
  type: {
    // color: 'white',
    position: 'absolute',
    top: 5,
    right: 5,
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
