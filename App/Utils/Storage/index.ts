import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './storage';

type DefaultValue = string | number | object;

export default {
  getItemFromStorage: <T extends DefaultValue>(
    key: (typeof StorageKeys)[keyof typeof StorageKeys],
    defaultValue: T,
  ): Promise<T> => {
    return new Promise(async resolve => {
      try {
        let value = await AsyncStorage.getItem(key);
        resolve(
          value
            ? typeof defaultValue === 'string'
              ? value
              : JSON.parse(value)
            : defaultValue,
        );
      } catch (error) {
        resolve(defaultValue);
      }
    });
  },
  setItemToStorage: async (
    key: (typeof StorageKeys)[keyof typeof StorageKeys],
    value: DefaultValue,
  ) => {
    try {
      await AsyncStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      );
    } catch (error) {}
  },
  removeItemFromStorage: async (
    key: (typeof StorageKeys)[keyof typeof StorageKeys],
  ) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  },
  removeItemsFromStorage: async (
    keys: (typeof StorageKeys)[keyof typeof StorageKeys][],
  ) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {}
  },
};
