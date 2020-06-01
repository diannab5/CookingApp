import {AsyncStorage }from 'react-native';

export const getNumberStorageAsync = async () => {
  const numberStorage = await AsyncStorage.getItem('number');
  const JSONstorage = JSON.parse(numberStorage);
  return JSONstorage
}