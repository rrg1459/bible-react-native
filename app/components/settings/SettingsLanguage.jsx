import { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <View>
          <Image
            source={require('../../images/translate.png')}
            style={styles.imageStyle}
          />
        </View>
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
    margin: 10,
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
    fontSize: 20,
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
  imageStyle: {
    width: 30,
    height: 30,
  },
});