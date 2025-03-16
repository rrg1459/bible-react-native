import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider'
import { changeBookColumns } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsBooks = ({ language, columns }) => {
  const dispatch = useDispatch();
  const handleSliderChange = useCallback((column) => {
    dispatch(changeBookColumns(column));
    saveItem({ BookColumns: column });
  }, [dispatch]);

  return (
    <View>
      <Text style={styles.labelBookColumns}>
        {language ? 'Columnas de libros' : 'Book columns'} : {columns}
      </Text>
      <Slider
        style={styles.sizeSlider}
        minimumValue={1}
        maximumValue={6}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbStyle={styles.thumb}
        value={columns}
        onSlidingComplete={item => handleSliderChange(item)}
      />
    </View>
  )
};
export default SettingsBooks

const styles = StyleSheet.create({
  labelBookColumns: {
    color: '#000000', fontSize: 25,
    marginBottom: 5,
    textAlign: 'center',
  },
  sizeSlider: {
    width: 300,
    height: 40
  },
  thumb: {
    width: 40,
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: "orange"
  },
});