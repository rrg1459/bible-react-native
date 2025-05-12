import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import SettingsLanguage from '../components/settings/SettingsLanguage';
import SettingsPromises from '../components/settings/SettingsPromises';
import SettingsJesusQuotes from '../components/settings/SettingsJesusQuotes';
import SettingsFavorite from '../components/settings/SettingsFavorite';
import SettingsVerses from '../components/settings/SettingsVerses';
import SettingsRetrievingFavorite from '../components/settings/SettingsRetrievingFavorite';
import empty from '../utils/emptyObject';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';
import { useCallback, useState } from 'react';

const Footer = ({ language }) => {
  const favorites = useSelector(state => state.quote.favorites);
  const retrieveFavorites = useSelector(state => state.quote.retrieveFavorites);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const showPromises = useSelector(state => state.quote.showPromises);
  const showJesusQuotes = useSelector(state => state.quote.showJesusQuotes);
  const [isModalVisible, setModealVisible] = useState(false);
  const handleTap = useCallback(() => {
      setModealVisible(!isModalVisible);
  }, [isModalVisible]);

  const handleBackdropPress = useCallback(() => {
    setModealVisible(false);
  }, []);

  return (
    <View style={styles.footer}>
      <View style={styles.developerBy}>
        <Modal
          isOpen={isModalVisible}
          testID={'modalTabletAuthor'}
          animationDuration={600}
          position="bottom"
          coverScreen={true}
          style={[styles.modal, styles.modalPosition]}
        >
          <Pressable onPress={handleBackdropPress}>
            <View style={styles.modalView}>
              <Text style={styles.author}>
                {language ? 'desarrollado con ❤️ por rafaDev' : 'developed with ❤️ by rafaDev'}
              </Text>
            </View>
          </Pressable>
        </Modal>
        <TouchableWithoutFeedback onPress={handleTap}>
          <Text style={{ fontSize: 18 }}>©</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.fontsize}>
        <SettingsVerses language={language} fontSizeVerse={fontSizeVerse} isTablet={true} />
      </View>
      {true &&
        empty(favorites) && !empty(retrieveFavorites) ? (
        <SettingsRetrievingFavorite language={language} isTablet={true} />
      ) : (
        <SettingsFavorite language={language} isTablet={true} />
      )
      }
      <View style={styles.language}>
        <SettingsLanguage language={language} isTablet={true} />
      </View>
      <View style={styles.language}>
        <SettingsPromises language={language} showPromises={showPromises} isTablet={true} />
      </View>
      <View style={styles.language}>
        <SettingsJesusQuotes language={language} showJesusQuotes={showJesusQuotes} isTablet={true} />
      </View>
    </View>
  )
}
export default Footer

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: "row",
  },
  developerBy: {
    flex: 0.5,
    backgroundColor: '#BDBEBD',
    justifyContent: "center",
    alignItems: 'center',
  },
  fontsize: {
    flex: 4,
    backgroundColor: 'lightblue',
    justifyContent: "center",
    alignItems: 'center',
  },
  language: {
    flex: 0.6,
  },
  fav: {
    flex: 1,
  },
  modal: {
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  modalPosition: {
    marginBottom: 10, // Posicionar el modal a 200 píxeles desde la parte superior
    right: 450,
  },
  modalView: {
    backgroundColor: '#ebf9f5',
    padding: 10,
    borderRadius: 4,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  author: {
    fontStyle: 'italic',
  },
})