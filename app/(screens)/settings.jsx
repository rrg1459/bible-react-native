import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreen, changeBookColumns, updateLanguage } from '../redux/quoteSlice';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {

  const dispatch = useDispatch();
  const route = useRoute();
  const sliderValue = useSelector(state => state.quote.bookColumns);
  const languageValue = useSelector(state => state.quote.language);
  const ScreenName = route.name;

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const onPress = () => {
    const lang = languageValue ? 0 : 1;
    dispatch(updateLanguage(lang))
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
          {languageValue ? 'Columnas de libros' : 'Book columns'} : {sliderValue}
        </Text>
        <Slider
          style={styles.sizeSlider}
          minimumValue={3}
          maximumValue={6}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbStyle={styles.thumb}
          value={sliderValue}
          onValueChange={item => dispatch(changeBookColumns(item))}
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
    fontSize: 60,
    color: '#3acaa6'
  },
  labelLanguage: {
    color: '#000000', fontSize: 60
  },
  labelBookColumns: {
    color: '#000000', fontSize: 30,
    marginBottom: 15,
  },
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 6,
    paddingHorizontal: 12,
    // marginBottom: 60,
    borderRadius: 8,
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
    fontSize: 36,
    lineHeight: 51,
    fontWeight: 'light',
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
    // width: 40,
    // height: 50,
    transform: [{ scaleX: 3 }, { scaleY: 3 }],
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: "orange"
  },
  separator: {
    width: '100%',
    // height: 80,
    marginVertical: 40,
    // borderBottomColor: 'black',
    borderBottomColor: '#b1b5b4',
    // borderBottomColor: '#dddaaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});