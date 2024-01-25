import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
export const setLocalStorageData = async (storageId, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(storageId, jsonValue)
    console.log("saved")

  } catch (e) {
    console.log("not saved")
  }
};
export const getLocalStorageData = async (storageId) => {
try {
    const storageData = await AsyncStorage.getItem(storageId)
    return storageData
  } catch (e) {
    return null
  }
};
export const clearAllLocalStorageData = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }
};