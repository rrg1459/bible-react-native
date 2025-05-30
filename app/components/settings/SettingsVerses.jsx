import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';
import { updateFontSizeVerse } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsVerses = ({ language, fontSizeVerse, isTablet }) => {
  const dispatch = useDispatch();
  const handleSliderChange = useCallback((size) => {
    dispatch(updateFontSizeVerse(size));
    saveItem({ FontSizeVerse: size });
  }, [dispatch]);

  const sizeSlider = useMemo(() => ({
    width: isTablet ? 280 : 340,
    marginTop: !isTablet && 10,
    height: 40
  }), [isTablet]);

  return (
    <View>
      {!isTablet &&
        <>
          <Text style={styles.label}>
            {language ? 'Tamaño de texto (versículo)' : 'Text size (verse)'}
          </Text>
          <Text style={{ fontSize: fontSizeVerse, textAlign: 'center' }}>
            {language ? 'Jesús Te Ama' : 'Jesus Love You'}
          </Text>
        </>
      }
      <Slider
        style={sizeSlider}
        minimumValue={10}
        maximumValue={30}
        step={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbStyle={styles.thumb}
        value={fontSizeVerse}
        onSlidingComplete={item => handleSliderChange(item)}
      />
    </View>
  )
};
export default SettingsVerses

const styles = StyleSheet.create({
  label: {
    color: '#000000', fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  thumb: {
    width: 40,
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: "orange"
  },
});
