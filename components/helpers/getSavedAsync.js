import {AsyncStorage }from 'react-native';

export const getSavedAsync = async () => {
  const item = await AsyncStorage.getItem('saved')
  const obj = JSON.parse(item);
  return obj;
};
