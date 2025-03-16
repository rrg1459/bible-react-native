import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider'
import { changeChapterColumns } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsChapters = ({language, columns}) => {
  const dispatch = useDispatch();
  const handleSliderChange = useCallback((column) => {
    dispatch(changeChapterColumns(column));
    saveItem({ ChapterColumns: column });
  }, [dispatch]);

  return (
    <View>
      <Text style={styles.label}>
        {language ? 'Columnas de capítulos' : 'Chapter columns'} : {columns}
      </Text>
      <Slider
        style={styles.sizeSlider}
        minimumValue={4}
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
export default SettingsChapters

const styles = StyleSheet.create({
  label: {
    color: '#000000', fontSize: 25,
    marginBottom: 65,
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