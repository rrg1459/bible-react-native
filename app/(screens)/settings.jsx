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
        <View style={styles.footer}>
          <Text style={styles.author}>
            rafaDev
          </Text>
          <Text style={styles.version}>
            V4360.1
          </Text>
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
    justifyContent: "space-between",
  },
  author: {
    fontSize: 7,
    color: 'grey',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  version: {
    fontSize: 8,
    color: 'black',
    marginRight: 10,
  },
});