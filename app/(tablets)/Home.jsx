import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Books from './Books';
import Chapters from './Chapters';
import Versicules from '../components/Versicules';
import Footer from './Footer';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { changeBookColumns } from '../redux/quoteSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(changeBookColumns(11));
    }, [dispatch])
  );

  return (
    <View style={styles.main}>
      <View style={styles.left}>
        <Header />
        <View style={styles.versicules}>
          <Versicules />
        </View>
        <Footer />
      </View>
      <View style={styles.right}>
        <View style={styles.books}>
          <Books />
        </View>
        <View style={styles.chapters}>
          <Chapters />
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