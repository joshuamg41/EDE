//@ts-nocheck
import AsyncStorage from '@react-native-community/async-storage';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`AsyncStorage set Error: ${error.message}`);
    }
  },
  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(`AsyncStorage get Error: ${error.message}`);
    }
    return null;
  },
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(`AsyncStorage clear Error: ${error.message}`);
    }
  },
};

export default deviceStorage;
