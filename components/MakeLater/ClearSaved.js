import { AsyncStorage } from 'react-native'

const ClearSaved = async () => {
  try {
    await AsyncStorage.removeItem('saved');
  } catch (error) {
     console.log(error);
  }
}  

export default ClearSaved
