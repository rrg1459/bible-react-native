import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice.js';
import Book from "../components/Book.jsx";
import { useDispatch, useSelector } from "react-redux";
import { books } from '../bible/books.js';

export default function Index() {

  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const languageValue = useSelector(state => state.quote.language);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const book = {
    "id": 62,
    "testament_id": 2,
    "type_id": 7,
    "label": ["1 John", "1 Juan"],
    "abbreviation": ["1Jhn", "1Jn"],
    "chapters": 5
  }

  return (
    <View style={styles.main} >
      <Text style={styles.header}>
        {languageValue ? 'Reina Valera (1960)' : 'King James Version (KJV)'}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <Link href={{
          pathname: "/chapters",
          params: book,
        }} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{book.label[languageValue]}</Link>
      </TouchableOpacity>

      <View style={styles.app}>
        <FlatList
          data={books}
          numColumns={4}
          renderItem={({ item }) => <Book book={item} />}
          keyExtractor={(book) => String(book.id)}
        />
      </View>

      <Link href="/settings" style={styles.floatingMenuButtonStyle}>
        {renderFloatingMenu()}
      </Link>

    </View>
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
    fontSize: 30,
    padding: 5,
    textAlign: "center",
    margin: 5
  },
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: "98%"
  },
  item: {
    flex: 1,
    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff"
  },
  readyBooks: {
    flex: 1, /* Ancho mínimo de 100px, crece y encoge proporcionalmente */
    flexDirection: 'row',
    height: 100, /* Altura fija */
  }
});

function renderFloatingMenu() {
  return (
    <Image
      source={require("../images/configuraciones.png")}
      style={{ width: 45, height: 45 }}
    />
  );
}
