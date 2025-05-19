
import { useEffect, useLayoutEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Immersive } from 'react-native-immersive'
// import * as Device from 'expo-device';
import isNineInchTabletOrLarger from './utils/isTablet';

import Tablet from "./(tablets)/Home";

import { Provider } from "react-redux";
import store from "./redux/store";

import { useColorScheme } from '@/app/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isTablet, setIsTablet] = useState(false);

  useLayoutEffect(() => {
    setIsTablet(isNineInchTabletOrLarger());
  }
  , []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') Immersive.on()
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.content}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          { isTablet
          ? <Tablet />
          :
            <Stack>
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          }
          <StatusBar hidden />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 33,
    flex: 1,
  },
});