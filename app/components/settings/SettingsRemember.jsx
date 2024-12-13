import { Image, StyleSheet, Text, View } from 'react-native'

const SettingsRemember = ({ language, currentScreen }) => {

  const screenNames = {
    books: ['books', 'libros'],
    chapters: ['chapters', 'capítulos'],
    verses: ['verses', 'versículos'],
  };

  const Fingers = () => (
    <Image
      source={require("../../images/swipe-right.png")}
      style={styles.image}
    />
  );

  return (
    <View style={styles.labelSubHeader}>
      <Fingers />
      <View>
        <Text style={styles.labelSubHeaderText}>
          {language ? '...recuerde regresar' : '...remember back'}
        </Text>
        <Text style={styles.labelSubHeaderText}>
          {language ? 'a los ' : 'to the '}
          <Text style={{ fontWeight: '500' }}>
            {screenNames[currentScreen][language]}
          </Text>
        </Text>
      </View>
      <Fingers />
    </View>
  )
};

export default SettingsRemember

const styles = StyleSheet.create({
  labelSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf9f5',
  },
  labelSubHeaderText: {
    textAlign: "center",
    backgroundColor: '#ebf9f5',
    fontSize: 20,
    fontStyle: 'italic',
  },
  image: {
    width: 65,
    height: 65,
  }
});