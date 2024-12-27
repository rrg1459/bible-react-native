import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../redux/quoteSlice";
import { useNavigation } from "expo-router";
import getColorByBookType from "../utils/getColorByBookType"

const Book = ({ book, type }) => {

  const dispatch = useDispatch();
  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const type_id = useSelector(state => state.quote.type_id);
  const navigation = useNavigation();
  const [bookColor] = useState(book.type_id ? getColorByBookType(book.type_id) : 'none');
  const [typeName, setTypeName] = useState('');

  useEffect(() => {
    if (type === undefined) return;
    setTypeName(bookColumnsValue > 1 ? type.substr(0, 4) : type);
  }, [type])

  const containerStyles = { backgroundColor: bookColor, ...styles.container };
  const abbreviationFont = [, , 29, 25, 22, 20, 16];
  const nameFont = [, 28, 15, 10, 7, 5, 4];
  const typeFont = [, 11, 16, 9, 8];

  const goToChapters = () => {
    dispatch(updateBook(book));
    navigation.navigate("chapters", book);
  };

  return (
    <TouchableOpacity style={{flex: 1}} onPress={book.testament_id ? goToChapters : null}>
      <View style={[containerStyles, book.testament_id ? styles.withBorder : styles.noShow]} >
        {bookColumnsValue > 1 &&
          <Text style={{ fontSize: abbreviationFont[bookColumnsValue] }}>
            {book.abbreviation[languageValue]}
          </Text>
        }
        {bookColumnsValue < 5 && type_id > 8 &&
          <Text style={[styles.type, { fontSize: typeFont[bookColumnsValue] }]}>{typeName}</Text>
        }
        {bookColumnsValue < 6 &&
          <Text style={{ fontSize: nameFont[bookColumnsValue] }}>
            {book.name[languageValue]}
          </Text>
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
    fontSize: 12,
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
