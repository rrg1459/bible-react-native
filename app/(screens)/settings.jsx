import { StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch } from 'react-redux';

const SettingsScreen = () => {

  const dispatch = useDispatch();

  const route = useRoute();
  const ScreenName = route.name;
  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{fontSize: 60, color: 'tomato'}}>Settings</Text>

    </View>
  );
}

export default SettingsScreen

const styles = StyleSheet.create({})