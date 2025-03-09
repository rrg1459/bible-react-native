import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsRetrievingFavorite = ({ language, isTablet }) => {
  const dispatch = useDispatch();
  const retrieveFavorites = useSelector(state => state.quote.retrieveFavorites);
  const onPress = useCallback(() => {
    dispatch(updateFavorites(retrieveFavorites));
    saveItem({ Favorites: retrieveFavorites });
  }, [dispatch, retrieveFavorites]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isTablet ? styles.buttonTablet : styles.button}
    >
      {isTablet
        ? <Text style={styles.textButtonTablet}>
          {language ? 'RECUPERAR\nFAVORITOS' : 'RETRIEVE\nFAVORITES'}
          </Text>
        : <Text style={styles.textButton}>
          {language ? 'Recuperar favoritos' : 'Retrieve favorites'}
          </Text>
      }
    </TouchableOpacity>
  )
}
export default SettingsRetrievingFavorite

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1ebf7',
  },
  textButtonTablet: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: '#7e7f94',
    textAlign: 'center',
  },
});