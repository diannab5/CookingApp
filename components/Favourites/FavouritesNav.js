import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favourites from './Favourites';
import faveRecipe from './faveRecipe';


export default function FavouritesNav ({navigation}){
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator>
      <Stack.Screen name="Favourites" component={Favourites} options={{
        title: null,
        headerShown: false }} />
      <Stack.Screen name="faveRecipe" component={faveRecipe} options={{
        title: null,
        headerStyle: {
          backgroundColor: 'lightsalmon'
        },
        headerBackTitleStyle: {
          color: 'white',
          },
          headerTintColor: "white"
      }}/>
    </Stack.Navigator>
  )
};
