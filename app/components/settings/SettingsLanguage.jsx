import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateLanguage } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsLanguage = ({ language, isTablet }) => {
  const dispatch = useDispatch();
  const onPress = useCallback(() => {
    const lang = language ? 0 : 1;
    dispatch(updateLanguage(lang));
    saveItem({ Language: lang });

  }, [dispatch, language]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isTablet ? styles.buttonTablet : styles.button}
    >
      {isTablet
        ?
        <Text style={styles.textButtonTablet}>
          {language ? 'ENG' : 'ESP'}
        </Text>
        :
        <Text style={styles.textButton}>
          {language ? 'Change to english' : 'Cambiar a español'}
        </Text>
      }
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
  buttonTablet: {
    flex: 1,
    backgroundColor: '#86dab6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonTablet: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: '#7e7f94',
  },
});