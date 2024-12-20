import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  getItem: async (key) => {
    try {
      let result = await AsyncStorage.getItem(key);
      return JSON.parse(result);
    }
    catch (e) {
      throw e;
    }
  },
  setItem: async (key, value, callback) => {
    try {
      const item = JSON.stringify(value);
      return await AsyncStorage.setItem(key, item, callback);
    }
    catch (e) {
      throw e;
    }
  }
};
