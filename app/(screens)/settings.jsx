import { StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreen, changeBookColumns } from '../redux/quoteSlice';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {

  const dispatch = useDispatch();
  const route = useRoute();
  const sliderValue = useSelector(state => state.quote.bookColumns);
  const ScreenName = route.name;

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <>
      <Text style={styles.labelHeader}>Settings</Text>
      <View style={styles.container}>
        <Text style={styles.labelBookColumns}>
          Book columns : {sliderValue}
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
          onValueChange={sliderValue => dispatch(changeBookColumns(sliderValue))}
        />
      </View>
    </>
  );
};
export default SettingsScreen

const styles = StyleSheet.create({
  labelHeader: {
    textAlign: "center",
    backgroundColor: '#ffef8a',
    fontSize: 60,
    color: 'tomato'
  },
  labelBookColumns: {
    color: '#000000', fontSize: 30
  },
  sizeSlider: {
    width: 300,
    height: 80
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffef8a',
  },
  thumb: {
    width: 40,
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1.5,
    borderColor: "orange"
  },
});