import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../../redux/quoteSlice';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';

const SettingsRetrievingFavorite = ({ language }) => {

  const dispatch = useDispatch();
  const retrieveFavorites = useSelector(state => state.quote.retrieveFavorites);

  const saveFavorites = useCallback(async (favorites) => {
    try {
      await Storage.setItem(KEY.Favorites, favorites);
    } catch (error) {
      console.error('Failed to save font favorites verse:', error);
    }
  }, []);

  const onPress = useCallback(() => {
    dispatch(updateFavorites(retrieveFavorites));
    saveFavorites(retrieveFavorites);
  }, [dispatch, retrieveFavorites, saveFavorites]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.textButton}>
        {language ? 'Recuperar favoritos' : 'Retrieve favorites'}
      </Text>
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
});