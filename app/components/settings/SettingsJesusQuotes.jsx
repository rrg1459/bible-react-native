import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateShowJesusQuotes } from '../../redux/quoteSlice';
import { saveItem } from "../../utils/setItems";

const SettingsJesusQuotes = ({ language, showJesusQuotes, isTablet }) => {
  const dispatch = useDispatch();
  const onPress = useCallback(() => {
    dispatch(updateShowJesusQuotes(!showJesusQuotes));
    saveItem({ ShowJesusQuotes: !showJesusQuotes });
  }, [dispatch, showJesusQuotes]);

    // #D2042D cherry
    const quoteStyle = useMemo(() => ({
      color: showJesusQuotes ? '#D2042D' : '#7e7f94',
    }), [showJesusQuotes]);

    return (
    <TouchableOpacity
      onPress={onPress}
      style={isTablet ? styles.buttonTablet : styles.button}
    >
      {
        isTablet ?
          <Text style={[quoteStyle, styles.textButtonTablet]}>{'JQ'}</Text>
          :
          showJesusQuotes ?
            <Text style={styles.textButton}>
              {language ? 'No destacar frases de Jesús' :  'Hide highlight Jesus quotes'}
            </Text>
            :
            <Text style={styles.textButton}>
              {language ? 'Destacar frases de Jesús' : 'Highlight Jesus quotes'}
            </Text>
      }
    </TouchableOpacity>
  )
};

export default SettingsJesusQuotes

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
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonTablet: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1.25,
  },
});