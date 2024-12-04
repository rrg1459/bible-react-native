import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import fillBox from "../utils/fillBox.js";
import { FlatList } from 'react-native-web';
import Chapter from "../components/Chapter.jsx";

const ChaptersScreen = () => {

  const languageValue = useSelector(state => state.quote.language);
  const dispatch = useDispatch();

  const params = useLocalSearchParams();
  const { chapters, label } = params;

  const route = useRoute();
  const ScreenName = route.name;

  const [chaptersVector, setChaptersVector] = useState(
    fillBox({ screen: ScreenName, chapters: chapters })
  );

  useEffect(() => {
    setChaptersVector(fillBox({ screen: ScreenName, chapters: chapters }));
  }, [chapters]);


  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <Text style={styles.header}>
        {label[languageValue]}
      </Text>

        {chapters}
        {languageValue ? 'Capítulo' : 'Chapter'}{chapters > 1 ? 's' : ''}

      <View style={styles.app}>
        <FlatList
          data={chaptersVector}
          numColumns={5}
          renderItem={({ item }) => <Chapter chapter={item} />}
          keyExtractor={(chapter) => String(chapter.id)}
        />
      </View>
    </View>

    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>
    //     {languageValue ? 'Pantalla de capitulos' : 'Chapters Screen'}
    //   </Text>
    //   <TouchableOpacity
    //     style={{
    //       backgroundColor: 'green',
    //       padding: 10,
    //       borderRadius: 5,
    //       margin: 10,
    //     }}
    //   >
    //     <Link href={{
    //       pathname: "/verses",
    //       params: params,
    //     }} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{label[languageValue]} - number of chapters: {chapters}</Link>
    //   </TouchableOpacity>
    // </View>
  );
}

export default ChaptersScreen

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
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: "98%"
  },
});