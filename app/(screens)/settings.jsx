import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import SettingsLanguage from '../components/settings/SettingsLanguage';
import SettingsBooks from '../components/settings/SettingsBooks';
import SettingsChapters from '../components/settings/SettingsChapters';
import SettingsVerses from '../components/settings/SettingsVerses';
import SettingsRemember from '../components/settings/SettingsRemember';
import SettingsGroups from '../components/settings/SettingsGroups';
import SettingsFavorite from '../components/settings/SettingsFavorite';
import SettingsRetrievingFavorite from '../components/settings/SettingsRetrievingFavorite';
import empty from '../utils/emptyObject';

const SettingsScreen = () => {

  const type_id = useSelector(state => state.quote.type_id);
  const favorites = useSelector(state => state.quote.favorites);
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const currentScreen = useSelector(state => state.quote.currentScreen);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const chapterColumnsValue = useSelector(state => state.quote.chapterColumns);
  const retrieveFavorites = useSelector(state => state.quote.retrieveFavorites);

  const lastTapTimeRef = useRef(null);
  const [isModalVisible, setModealVisible] = useState(false);

  const separator = useMemo(() => <View style={styles.separator} />, []);

  const handleTap = useCallback(() => {
    const now = new Date().getTime();
    const DOUBLE_TAP_DELAY = 500; // Adjust as needed for your use case (in milliseconds)
    if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
      setModealVisible(!isModalVisible);
    };
    lastTapTimeRef.current = now;
  }, [isModalVisible]);

  const handleBackdropPress = useCallback(() => {
    setModealVisible(false);
  }, []);

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        testID={'modalAuthor'}
        onBackdropPress={handleBackdropPress}
        backdropColor="#ebf9f5"
        backdropOpacity={0.85}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <Pressable style={styles.centeredView} onPress={handleBackdropPress}>
          <View style={styles.modalView}>
            <Text style={styles.author}>
              {languageValue ? 'desarrollado con ❤️ por rafaDev' : 'developed with ❤️ by rafaDev'}
            </Text>
          </View>
        </Pressable>
      </Modal>
      <TouchableWithoutFeedback onPress={handleTap}>
        <Text style={styles.labelHeader}>{languageValue ? 'Ajustes' : 'Settings'}</Text>
      </TouchableWithoutFeedback>

      <SettingsRemember language={languageValue} currentScreen={currentScreen} />

      <View style={styles.container}>
        {separator}
        <SettingsLanguage language={languageValue} />
        {separator}

        {empty(favorites) && !empty(retrieveFavorites) ? (
          <>
            <SettingsRetrievingFavorite language={languageValue} />
            {separator}
          </>
        ) : (
          <>
            <SettingsFavorite language={languageValue} />
            {separator}
          </>
        )}

        {currentScreen === 'books' &&
          <>
            <SettingsGroups language={languageValue} type_id={type_id} />
            {separator}
            <SettingsBooks language={languageValue} columns={bookColumnsValue} />
            {separator}
          </>
        }

        {currentScreen === 'chapters' &&
          <>
            <SettingsChapters language={languageValue} columns={chapterColumnsValue} />
            {separator}
          </>
        }

        {currentScreen === 'verses' &&
          <>
            <SettingsVerses language={languageValue} fontSizeVerse={fontSizeVerse} />
            {separator}
          </>
        }
      </View>
      <View style={styles.footer}>
        <Text style={styles.version}>E17.1</Text>
      </View>
    </>
  );
};
export default SettingsScreen

// const today = new Date();
// const startOfYear = new Date(today.getFullYear(), 0, 0);
// const diff = today - startOfYear;
// const oneDay = 1000 * 60 * 60 * 24;
// const julianDay = Math.floor(diff / oneDay);

const styles = StyleSheet.create({
  labelHeader: {
    textAlign: "center",
    backgroundColor: '#ebf9f5',
    fontSize: 50,
    paddingTop: 30,
    paddingBottom: 20,
    color: '#3acaa6'
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#ebf9f5',
  },
  separator: {
    width: '100%',
    marginVertical: 10,
    borderBottomColor: '#b1b5b4',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    flex: 0,
    backgroundColor: '#ebf9f5',
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  author: {
    marginLeft: 10,
    fontStyle: 'italic',
  },
  version: {
    fontSize: 9,
    color: 'black',
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    marginHorizontal: 'auto',
    marginTop: 70,
  },
  modalView: {
    padding: 10,
    borderRadius: 4,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
});