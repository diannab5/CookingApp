import {AsyncStorage }from 'react-native';

export const getProfileStorageAsync = async () => {
  const profileStorage = await AsyncStorage.getItem('state');
  const JSONstorage = JSON.parse(profileStorage);
  // if profileStorage === null return object
  return JSONstorage
}