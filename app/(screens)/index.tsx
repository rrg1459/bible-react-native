import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useRoute  } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import { useCustomDispath } from "../redux/hook";

export default function Index() {

  const dispatch = useCustomDispath();
  const route = useRoute();
  const ScreenName = route.name;

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const book =     {
    "id": 62,
    "testament_id": 2,
    "type_id": 7,
    "label": ["1 John", "1 Juan"],
    "abbreviation": ["1Jhn", "1Jn"],
    "chapters": 5
  }

  return (
    <View style={styles.main} >
      <Text>Index</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <Link         href={{
          pathname: "/chapters",
          params: book,
        }} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{book.label[1]}</Link>
      </TouchableOpacity>

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
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20
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
