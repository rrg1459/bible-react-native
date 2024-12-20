import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';
import { updateFontSizeVerse } from '../../redux/quoteSlice';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';

const SettingsVerses = ({ language, fontSizeVerse }) => {

  const dispatch = useDispatch();

  const saveFontSizeVerse = async (size) => {
    try {
      await Storage.setItem(KEY.FontSizeVerse, size);
    } catch (error) {
      console.error('Failed to save font size verse:', error);
    }
  };

  const handleSliderChange = (size) => {
    dispatch(updateFontSizeVerse(size));
    saveFontSizeVerse(size);
  };

  return (
    <View>
      <Text style={styles.label}>
        {language ? 'Tamaño de texto (versículo)' : 'Text size (verse)'}
      </Text>
      <Text style={{ fontSize: fontSizeVerse, textAlign: 'center' }}>
        {language ? 'Jesús Te Ama' : 'Jesus Love You'}
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
        onSlidingComplete={item => handleSliderChange(item)}
      />
    </View>
  )
};

export default SettingsVerses

const styles = StyleSheet.create({
  label: {
    color: '#000000', fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  sizeSlider: {
    marginTop: 25,
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
