import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResults from './SearchResults';
import Recipe from '../Recipe/Recipe';
import MyCarousel from './SearchResultCards';
import SliderEntry from './SliderEntry';



export default function SearchResultsNav ({navigation}){
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator>
      <Stack.Screen name="Search Results" component={SearchResults} options={{
        title: null,
        headerShown: false }} />
      <Stack.Screen name="SearchResultCards" component={MyCarousel} options={{
        title: null,
        headerTransparent: true,
        headerBackTitleStyle: {
          color: 'white',
          },
          headerTintColor: "white"
      }}/>
      <Stack.Screen name="SliderEntry" component={SliderEntry} options={{
        title: null,
        headerTransparent: true,
        headerBackTitleStyle: {
          color: 'white',
          },
          headerTintColor: "white"
      }}/>
      <Stack.Screen name="Recipe" component={Recipe} options={{
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


}
