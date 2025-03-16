import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateFavorites } from '../../redux/quoteSlice';
import Modal from 'react-native-modalbox';
import { saveItem } from "../../utils/setItems";

const SettingsFavorite = ({ language, isTablet }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const onPressYes = useCallback(() => {
    toggleModal();
    dispatch(updateFavorites({}));
    saveItem({ Favorites: {} });
  }, [dispatch, toggleModal]);

  const onPressNo = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  return (
    <>
      <Modal
        isOpen={isModalVisible}
        testID={'modal'}
        style={styles.modal}
        animationDuration={600}
        position="center"
        coverScreen={true}
        backdropOpacity={0.8}
      >
        <View>
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
        style={isTablet ? styles.buttonTablet : styles.button}
      >
        {isTablet
          ?
          <Text style={styles.textButtonTablet}>
            {language ? 'OLVIDAR\nFAVORITOS' : 'RESET\nFAVORITES'}
          </Text>
          :
          <Text style={styles.textButton}>
            {language ? 'Olvida los favoritos' : 'Reset favorites'}
          </Text>
        }
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
  modal: {
    height: 170,
    width: 265,
    justifyContent: 'center',
    backgroundColor: '#F1FAF8',
    borderWidth: 0.5,
    borderColor: 'grey',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
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