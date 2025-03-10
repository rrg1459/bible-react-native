import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { changeScreen } from '../redux/quoteSlice';
import Versicules from './Versicules';
import Header from './Header';

const ComponentVerses = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;

  useFocusEffect(
    useCallback(() => {
      dispatch(changeScreen(ScreenName));
    }, [dispatch, ScreenName])
  );

  return (
    <View style={styles.main}>
      <Header />
      <Versicules />
    </View>
  );
};

export default ComponentVerses;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: 'skyblue',
  },
});