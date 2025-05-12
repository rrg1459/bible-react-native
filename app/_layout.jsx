
import { useEffect, useLayoutEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as NavigationBar from "expo-navigation-bar"
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
// import * as Device from 'expo-device';
import isNineInchTabletOrLarger from './utils/isTablet';

import Tablet from "./(tablets)/Home";

import { Provider } from "react-redux";
import store from "./redux/store";

import { useColorScheme } from '@/app/hooks/useColorScheme';
import { AppState, StyleSheet } from 'react-native';
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
    const hideNavBar = async () => {
      await NavigationBar.setPositionAsync('absolute');
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync('overlay-swipe');
    };
    hideNavBar();
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        hideNavBar();
      }
    };
    // Add event listener for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    // Cleanup the event listener on component unmount
    return () => {
      subscription.remove();
    };
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