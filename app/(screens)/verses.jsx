import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch } from 'react-redux';

const VersesScreen = () => {

  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const params = useLocalSearchParams();
  const { chapters, label } = params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>VersesScreen</Text>
      <Text style={{fontSize: 40, color: 'skyblue'}}>Verses</Text>
      <Text>XXX: {chapters}</Text>
    </View>
  );
}

export default VersesScreen

const styles = StyleSheet.create({})