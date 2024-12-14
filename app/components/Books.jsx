import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice.js';
import Book from "./Book.jsx";
import { useDispatch, useSelector } from "react-redux";
import fillBooks from "../utils/fillBooks.js";

export default function ComponentBooks() {

  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const languageValue = useSelector(state => state.quote.language);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(fillBooks({ screen: ScreenName, columnsValue: bookColumnsValue }));
  }, [bookColumnsValue]);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <Text style={styles.headerBible}>
        {languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version'}
      </Text>
      <View style={styles.books}>
        <FlatList
          data={books}
          numColumns={bookColumnsValue}
          key={bookColumnsValue}
          renderItem={({ item }) => <Book book={item} />}
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
  books: {
    flex: 1, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    paddingTop: 5,
    paddingBottom: 50,
    width: "98%"
  },
});
