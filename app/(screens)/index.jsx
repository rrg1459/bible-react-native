import { useEffect, useState } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice.js';
import Book from "../components/Book.jsx";
import { useDispatch, useSelector } from "react-redux";
import fillBooks from "../utils/fillBooks.js";

export default function Index() {

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
    <>
      <StatusBar hidden />
      <View style={styles.main} >
        <Text style={styles.header}>
          {languageValue ? 'Biblia Reina Valera' : 'Bible King James Version'}
        </Text>
        <View style={styles.app}>
          <FlatList
            data={books}
            numColumns={bookColumnsValue}
            key={bookColumnsValue}
            renderItem={({ item }) => <Book book={item} />}
            keyExtractor={(book) => String(book.id)}
          />
        </View>
        <Link href="/settings" style={styles.floatingMenuButtonStyle}>
          {renderFloatingMenu()}
        </Link>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    flex: 1
  },
  header: {
    backgroundColor: '#7dfcd2',
    fontSize: 25,
    // padding: 5,
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 60,
    right: 20
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: "98%"
  },
});

function renderFloatingMenu() {
  return (
    <Image
      source={require("../images/configuraciones.png")}
      style={{ width: 45, height: 45 }}
    />
  );
}
