import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { changeScreen, updateVerses } from '../redux/quoteSlice';
import fillBox from "../utils/fillBox.js";
import { FlatList } from 'react-native';
import Chapter from "../components/Chapter.jsx";

const ChaptersScreen = () => {

  const languageValue = useSelector(state => state.quote.language);
  const book = useSelector(state => state.quote.book);
  const dispatch = useDispatch();
  const { chapters, label } = book;
  const route = useRoute();
  const ScreenName = route.name;
  const [chaptersVector, setChaptersVector] = useState([]);

  useEffect(() => {
    
    setChaptersVector(fillBox({ screen: ScreenName, chapters: chapters }));
  }, [chapters]);
  
  
  useFocusEffect(() => {
    dispatch(updateVerses([]));
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View style={styles.main} >
      <Text style={styles.header}>
        {label[languageValue]}
      </Text>
      <Text>
        {chapters}
        {languageValue ? 'Capítulo' : 'Chapter'}{chapters > 1 ? 's' : ''}
      </Text>
      <View style={styles.app}>
        <FlatList
          data={chaptersVector}
          numColumns={5}
          renderItem={({ item }) => <Chapter chapter={item} />}
          keyExtractor={(chapter) => String(chapter.id)}
        />
      </View>
    </View>
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