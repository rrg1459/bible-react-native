import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import SettingsLanguage from '../components/settings/SettingsLanguage';
import SettingsBooks from '../components/settings/SettingsBooks';
import SettingsChapters from '../components/settings/SettingsChapters';
import SettingsVerses from '../components/settings/SettingsVerses';
import SettingsRemember from '../components/settings/SettingsRemember';
import SettingsGroups from '../components/settings/SettingsGroups';

const SettingsScreen = () => {

  const currentScreen = useSelector(state => state.quote.currentScreen);
  const bookColumnsValue = useSelector(state => state.quote.bookColumns);
  const chapterColumnsValue = useSelector(state => state.quote.chapterColumns);
  const languageValue = useSelector(state => state.quote.language);
  const fontSizeVerse = useSelector(state => state.quote.fontSizeVerse);
  const type_id = useSelector(state => state.quote.type_id);

  const Separator = () => <View style={styles.separator} />;

  return (
    <>
      <Text style={styles.labelHeader}>{languageValue ? 'Ajustes' : 'Settings'}</Text>

      <SettingsRemember language={languageValue} currentScreen={currentScreen} />

      <View style={styles.container}>
        <Separator />
        <SettingsLanguage language={languageValue} />
        <Separator />

        {currentScreen === 'books' &&
          <>
            <SettingsGroups language={languageValue} type_id={type_id} />
            <Separator />
            <SettingsBooks language={languageValue} columns={bookColumnsValue} />
            <Separator />
          </>
        }

        {currentScreen === 'chapters' &&
          <>
            <SettingsChapters language={languageValue} columns={chapterColumnsValue} />
            <Separator />
          </>
        }

        {currentScreen === 'verses' &&
          <>
            <SettingsVerses language={languageValue} fontSizeVerse={fontSizeVerse} />
            <Separator />
          </>
        }
      </View>
    </>
  );
};
export default SettingsScreen

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
});