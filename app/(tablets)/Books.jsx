import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import favoriteInTheBooks from "../utils/favoriteInTheBooks.js";
import getTypeNames from '../utils/getTypeNames.js';
import fillBooks from "../utils/fillBooks.js";
import { useSelector } from "react-redux";
import Book from "../components/Book.jsx";
import types from '../bible/types.js';

export default function TabletBooks() {

  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const favorites = useSelector(state => state.quote.favorites);
  const language = useSelector(state => state.quote.language);
  const currentBook = useSelector(state => state.quote.book);

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setFavoriteBooks(favoriteInTheBooks({ favorites }));
  }, [favorites]);

  useEffect(() => {
    setBooks(fillBooks({
      screen: 'books',
      columnsValue: bookColumnsValue,
      type_id: 11
    }));
  }, [bookColumnsValue]);

  const getTypes = useMemo(() => getTypeNames({ language, types }), [language]);

  const getType = useCallback((id) => {
    if (id === null) return;
    const type = getTypes.find((item) => item.key === id);
    return type ? type.value[language] : null;
  }, [getTypes, language]);

  return (
    <View style={styles.books}>
      <FlatList
        data={books}
        numColumns={bookColumnsValue}
        key={bookColumnsValue}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Book
            book={item}
            type={getType(item.type_id)}
            bookFavorite={favoriteBooks.includes(item.id)}
            isNotCurrentBook={currentBook.id !== item.id ? true : false}
          />)}
        keyExtractor={(book) => String(book.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  books: {
    marginHorizontal: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
