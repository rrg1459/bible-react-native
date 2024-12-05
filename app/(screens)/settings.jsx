import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreen, changeBookColumns, updateLanguage, updateFontSizeVerse } from '../redux/quoteSlice';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {

  const dispatch = useDispatch();
  const route = useRoute();
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const ScreenName = route.name;

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const onPress = () => {
    const lang = languageValue ? 0 : 1;
    dispatch(updateLanguage(lang));
  };

  const Separator = () => <View style={styles.separator} />;

  return (
    <>
      <Text style={styles.labelHeader}>{languageValue ? 'Ajustes' : 'Settings'}</Text>
      <View style={styles.container}>
        <Separator />
        <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.textButton}>
            {languageValue ? 'Change to english' : 'Cambiar a español'}
          </Text>
        </TouchableOpacity>
        <Separator />
        <Text style={styles.labelBookColumns}>
          {languageValue ? 'Columnas de libros' : 'Book columns'} : {bookColumnsValue}
        </Text>
        <Slider
          style={styles.sizeSlider}
          minimumValue={3}
          maximumValue={6}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbStyle={styles.thumb}
          value={bookColumnsValue}
          onSlidingComplete={item => dispatch(changeBookColumns(item))}
        />
        <Separator />
        <Text style={styles.labelBookColumns}>
          {languageValue ? 'Tamaño de fuente (versículo)' : 'Font Size (verse)'}
        </Text>
        <Text style={{ fontSize: fontSizeVerse, textAlign: 'center' }}>
          {languageValue ? 'Jesús Te Ama' : 'Jesus Love You'}
        </Text>
        <Slider
          style={styles.sizeSlider}
          minimumValue={10}
          maximumValue={30}
          step={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbStyle={styles.thumb}
          value={fontSizeVerse}
          onSlidingComplete={item => dispatch(updateFontSizeVerse(item))}
        />
        <Separator />

      </View>
    </>
  );
};
export default SettingsScreen

const styles = StyleSheet.create({
  labelHeader: {
    textAlign: "center",
    backgroundColor: '#ebf9f5',
    fontSize: 50,
    paddingTop: 30,
    color: '#3acaa6'
  },
  labelLanguage: {
    color: '#000000', fontSize: 60
  },
  labelBookColumns: {
    color: '#000000', fontSize: 25,
    marginBottom: 15,
  },
  button: {
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 15,
    elevation: 6,
    backgroundColor: '#FCFCFD',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 3,
    }

  },
  textButton: {
    fontSize: 25,
    lineHeight: 51,
    fontWeight: 'light',
    // marginVertical: 10,
    letterSpacing: 1.25,
    color: '#36395A',
  },
  sizeSlider: {
    width: 300,
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ebf9f5',
  },
  thumb: {
    width: 40,
    height: 50,
    // transform: [{ scaleX: 3 }, { scaleY: 3 }],
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: "orange"
  },
  separator: {
    width: '100%',
    marginVertical: 10,
    borderBottomColor: '#b1b5b4',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});