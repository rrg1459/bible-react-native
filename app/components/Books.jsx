import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { changeScreen } from '../redux/quoteSlice.js';
import favoriteInTheBooks from "../utils/favoriteInTheBooks.js";
import getTypeNames from '../utils/getTypeNames.js';
import getTypeName from "../utils/getTypeName.js";
import fillBooks from "../utils/fillBooks.js";
import types from '../bible/types.js';
import Book from "./Book.jsx";

export default function ComponentBooks() {

  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const language = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const favorites = useSelector(state => state.quote.favorites);
  const type_id = useSelector(state => state.quote.type_id);
  const currentBook = useSelector(state => state.quote.book);
  const [books, setBooks] = useState([]);
  const [typeName, setTypeName] = useState('');
  const [bible, setBible] = useState('');
  const [getTypes, setGetTypes] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    setFavoriteBooks(favoriteInTheBooks({ favorites }));
  }, [favorites]);

  useEffect(() => {
    setBooks(fillBooks({
      screen: ScreenName,
      columnsValue: bookColumnsValue,
      type_id: type_id
    }));
  }, [bookColumnsValue, type_id, ScreenName]);

  useEffect(() => {
    setGetTypes(getTypeNames({ language, types }));
    setBible(language ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version')
  }, [language]);

  useEffect(() => {
    if (typeof type_id !== 'number') return;
    setTypeName(getTypeName({ language, type_id, }));
  }, [language, type_id]);

  useFocusEffect(
    useCallback(() => {
      dispatch(changeScreen(ScreenName));
    }, [dispatch, ScreenName])
  );

  const getType = useCallback((id) => {
    if (id === null) return;
    return getTypes.find((item) => item.key === id)?.value[language];
  }, [getTypes, language]);

  return (
    <View style={styles.main} >
      <Text style={styles.headerBible}>{bible}</Text>
      {typeName !== '' &&
        <Text style={styles.type}>{typeName}</Text>
      }
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
              isNotCurrentBook={currentBook !== item ? true : false}
            />)}
          keyExtractor={(book) => String(book.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    flex: 1
  },
  headerBible: {
    backgroundColor: '#7dfcd2',
    fontSize: 22,
    paddingVertical: 10,
    textAlign: "center",
  },
  type: {
    paddingTop: 5,
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  books: {
    flex: 1,
    marginHorizontal: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
