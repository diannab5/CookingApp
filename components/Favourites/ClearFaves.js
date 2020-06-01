import { AsyncStorage } from 'react-native'

const ClearFaves = async () => {
  try {
    await AsyncStorage.removeItem('favourites');
  } catch (error) {
     console.log(error);
  }
  
}  

export default ClearFaves
