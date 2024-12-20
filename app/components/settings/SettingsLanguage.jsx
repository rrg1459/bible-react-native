import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateLanguage } from '../../redux/quoteSlice';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';

const SettingsLanguage = ({ language }) => {

  const dispatch = useDispatch();

  const saveLanguage = async (lang) => {
    try {
      await Storage.setItem(KEY.Language, lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const onPress = () => {
    const lang = language ? 0 : 1;
    dispatch(updateLanguage(lang));
    saveLanguage(lang);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.textButton}>
        {language ? 'Change to english' : 'Cambiar a español'}
      </Text>
    </TouchableOpacity>
  )
};

export default SettingsLanguage

const styles = StyleSheet.create({
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
    letterSpacing: 1.25,
    color: '#36395A',
  },
});