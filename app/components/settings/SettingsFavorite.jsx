import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateFavorites } from '../../redux/quoteSlice';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';

const SettingsFavorite = ({ language }) => {

  const dispatch = useDispatch();

  const saveFavorite = async (lang) => {
    try {
      await Storage.setItem(KEY.Favorites, lang);
    } catch (error) {
      console.error('Failed to save favorite:', error);
    }
  };

  const onPress = () => {
    dispatch(updateFavorites({}));
    saveFavorite({});
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.textButton}>
        {language ? 'Olvida los favoritos' : 'Reset favorites'}
      </Text>
    </TouchableOpacity>
  )
};

export default SettingsFavorite

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