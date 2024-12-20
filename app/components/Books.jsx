import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { changeScreen } from '../redux/quoteSlice.js';
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
  const type_id = useSelector(state => state.quote.type_id);
  const [books, setBooks] = useState([]);
  const [typeName, setTypeName] = useState('');
  const [bible, setBible] = useState('');
  const [getTypes, setGetTypes] = useState('');

  const getType = (id) => {
    if (id === null) return;
    return getTypes.find((item) => item.key === id).value[language];
  };

  useEffect(() => {
    setBooks(fillBooks({
      screen: ScreenName,
      columnsValue: bookColumnsValue,
      type_id: type_id
    }));
  }, [bookColumnsValue, type_id]);

  useEffect(() => {
    setGetTypes(getTypeNames({ language, types }));
    setBible(language ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version')
  }, [language]);

  useEffect(() => {
    if (typeof type_id !== 'number') return;
    setTypeName(getTypeName({ language, type_id, }));
  }, [language, type_id]);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

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
          renderItem={({ item }) => <Book book={item} type={getType(item.type_id)} />}
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
    fontSize: 23,
    paddingVertical: 10,
    textAlign: "center",
  },
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  type: {
    paddingTop: 5,
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  books: {
    flex: 1, // the number of columns you want to devide the screen into
    marginHorizontal: 4,
    paddingTop: 5,
    paddingBottom: 50,
  },
});
