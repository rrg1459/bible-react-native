import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modalbox';
import { useSelector } from 'react-redux';
import SettingsLanguage from '../components/settings/SettingsLanguage';
import SettingsPromises from '../components/settings/SettingsPromises';
import SettingsJesusQuotes from '../components/settings/SettingsJesusQuotes';
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
  const showPromises = useSelector(state => state.quote.showPromises);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const currentScreen = useSelector(state => state.quote.currentScreen);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const showJesusQuotes = useSelector(state => state.quote.showJesusQuotes);
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
        isOpen={isModalVisible}
        testID={'modalAuthor'}
        animationDuration={600}
        position="top"
        coverScreen={true}
        style={[styles.modal, styles.modalPosition]}
      >
        <Pressable onPress={handleBackdropPress}>
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

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {separator}
        <SettingsLanguage language={languageValue} />
        {separator}

        <SettingsPromises language={languageValue} showPromises={showPromises} />
        {separator}

        <SettingsJesusQuotes language={languageValue} showJesusQuotes={showJesusQuotes} />
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
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.version}>{'E165.1'}</Text>
      </View>
    </>
  );
};
export default SettingsScreen

// const today = new Date();
// const startOfYear = new Date(today.getFullYear(), 0, 0);
// const diff = today - startOfYear;
// const oneDay = 1000 * 60 * 60 * 24;
// Math.floor(diff / oneDay);

const styles = StyleSheet.create({
  labelHeader: {
    textAlign: "center",
    backgroundColor: '#ebf9f5',
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 5,
    color: '#3acaa6'
  },
  container: {
    flex: 1,
    backgroundColor: '#ebf9f5',
  },
  contentContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
  },
  separator: {
    width: '100%',
    marginVertical: 5,
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
    fontStyle: 'italic',
  },
  version: {
    fontSize: 9,
    color: 'black',
    marginRight: 10,
  },
  modal: {
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  modalPosition: {
    marginTop: 10, // Posicionar el modal a 200 píxeles desde la parte superior
  },
  modalView: {
    backgroundColor: '#ebf9f5',
    padding: 10,
    borderRadius: 4,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
});