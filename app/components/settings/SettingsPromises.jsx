import { useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateShowPromises } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsPromises = ({ language, showPromises, isTablet }) => {
  const dispatch = useDispatch();
  const onPress = useCallback(() => {
    dispatch(updateShowPromises(!showPromises));
    saveItem({ ShowPromises: !showPromises });
  }, [dispatch, showPromises]);

  const promiseStyle = useMemo(() => ({
    backgroundColor: showPromises ? '#E8F0FF' : 'skyblue',
  }), [showPromises]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isTablet ? styles.buttonTablet : styles.button}
    >
      {
        isTablet ?
          <View style={promiseStyle}>
            <Text style={styles.textButtonTablet}>{'PR'}</Text>
          </View>
          :
          showPromises ?
            <Text style={styles.textButton}>
              {language ? 'No destacar promesas' : 'Hide highlight promises'}
            </Text>
            :
            <Text style={styles.textButton}>
              {language ? 'Destacar promesas' : 'Highlight promises'}
            </Text>
      }
    </TouchableOpacity>
  )
};

export default SettingsPromises

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
    backgroundColor: '#62C1E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonTablet: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: '#646576',
  },
});