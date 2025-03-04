import { View, Text, StyleSheet } from 'react-native';

const Home = () => {


  return (
    <View style={styles.main}>
      <View style={styles.left}>
        <Text>"Header"</Text>
        <View style={styles.versicules}>
        <Text>"Versicules"</Text>
        </View>
        <Text>"Footer"</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.books}>
        <Text>"Books"</Text>
        </View>
        <View style={styles.chapters}>
        <Text>"Chapters"</Text>
        </View>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: "row",
  },
  left: {
    flex: 5,
  },
  versicules: {
    flex: 16,
    backgroundColor: 'skyblue', // FOR REMOVE
  },
  right: {
    flex: 8,
  },
  books: {
    width: 'auto',
    backgroundColor: 'lightblue',
  },
  chapters: {
    flex: 1,
    backgroundColor: '#a1e8ff',
  },
});