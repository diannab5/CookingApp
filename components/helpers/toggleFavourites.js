import {AsyncStorage }from 'react-native';


export const toggleFavourites = async (recipe, recipeId, bool) => {
  if (bool === true) {
    try {
      const item = await AsyncStorage.getItem('favourites')
      let favourites = JSON.parse(item);

        if ( favourites === null ) {

        favourites = {
             recipeId:recipe
         }

          const stringFavourites = JSON.stringify(favourites);
          return await AsyncStorage.setItem('favourites', stringFavourites)
          
        }
      favourites[recipeId] = recipe;
      const stringFavourites = JSON.stringify(favourites);
      await AsyncStorage.setItem('favourites', stringFavourites)
    }
    catch(err) {
      console.log(err);
    }
  } else if (bool === false) {
    try {
      const item = await AsyncStorage.getItem('favourites')
      let favourites = JSON.parse(item);
      delete favourites[recipeId]
      const stringFavourites = JSON.stringify(favourites);
      await AsyncStorage.setItem('favourites', stringFavourites)
    }
    catch(err) {
      console.log(err);
    }
  }
};



