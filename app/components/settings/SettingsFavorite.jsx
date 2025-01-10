import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateFavorites } from '../../redux/quoteSlice';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';
import Modal from 'react-native-modal';

const SettingsFavorite = ({ language }) => {

  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

  const saveFavorite = useCallback(async (data) => {
    try {
      await Storage.setItem(KEY.Favorites, data);
    } catch (error) {
      console.error('Failed to save favorite:', error);
    }
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const onPressYes = useCallback(() => {
    toggleModal();
    dispatch(updateFavorites({}));
    saveFavorite({});
  }, [dispatch, saveFavorite, toggleModal]);

  const onPressNo = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  return (

    <>

      <Modal
        isVisible={isModalVisible}
        testID={'modal'}
        onBackdropPress={toggleModal}
        backdropColor="#ebf9f5"
        backdropOpacity={0.6}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {language
            ? '¿Está seguro de\nolvidar los favoritos?'
            : 'Are you sure to\nreset favorites?'
            }</Text>
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.yesNoButton}
              onPress={onPressYes}>
              <Text style={styles.yesText}>{language ? 'SI' : 'Yes'}</Text>
            </Pressable>
            <Pressable style={styles.yesNoButton}
              onPress={onPressNo}>
              <Text style={styles.noText}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        onPress={toggleModal}
        style={styles.button}
      >
        <Text style={styles.textButton}>
          {language ? 'Olvida los favoritos' : 'Reset favorites'}
        </Text>
      </Pressable>
    </>
  )
};

export default SettingsFavorite

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FCFCFD',
    borderRadius: 8,
    elevation: 6,
    paddingHorizontal: 12,
    margin: 15,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  textButton: {
    color: '#36395A',
    fontSize: 25,
    fontWeight: 'light',
    letterSpacing: 1.25,
    lineHeight: 51,
  },
  modalContent: {
    backgroundColor: 'aqua',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    elevation: 10,
    padding: 20,
    margin: 'auto',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    width: 220,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yesNoButton: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#707070',
    height: 45,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  yesText: {
    color: 'red',
    fontSize: 25,
  },
  noText: {
    color: 'blue',
    fontSize: 25,
  }
});