import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChaptersScreen = () => {

  const languageValue = useSelector(state => state.quote.language);
  const dispatch = useDispatch();

  const route = useRoute();
  const ScreenName = route.name;

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const params = useLocalSearchParams();
  const { chapters, label } = params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        {languageValue ? 'Pantalla de capitulos' : 'Chapters Screen'}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <Link href={{
          pathname: "/verses",
          params: params,
        }} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{label} - number of chapters: {chapters}</Link>
      </TouchableOpacity>
    </View>
  );
}

export default ChaptersScreen

const styles = StyleSheet.create({})