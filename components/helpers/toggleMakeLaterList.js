import { AsyncStorage } from 'react-native'

export const toggleMakeLaterList = async (recipe, recipeId, bool) => {
  if (bool === true) {
    try {
      const item = await AsyncStorage.getItem('saved')
      let saved = JSON.parse(item);
      
      if ( saved === null ) {
        
        saved = {
          recipeId:recipe
        }
        
        const stringsaved = JSON.stringify(saved);
        return await AsyncStorage.setItem('saved', stringsaved)
        
      }
      
      saved[recipeId] = recipe;
      const stringsaved = JSON.stringify(saved);
      await AsyncStorage.setItem('saved', stringsaved)
    }
    catch(err) {
      console.log(err);
    }
  } else if (bool === false) {
    try {
      const item = await AsyncStorage.getItem('saved')
      let saved = JSON.parse(item);
      delete saved[recipeId] 
      const stringsaved = JSON.stringify(saved);
      await AsyncStorage.setItem('saved', stringsaved)
    }
    catch(err) {
      console.log(err);
    }
  }
}; 

