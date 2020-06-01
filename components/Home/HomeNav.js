import React from 'react';
import CameraApp from '../Camera';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions, NavigationActions } from 'react-navigation';
import Home from './Home'
import SearchResults from '../SearchResults/SearchResults.js';
import LoadingScreen from '../LoadingScreen'
import Recipe from '../Recipe/Recipe';


export default function HomeNav ({navigation}){

  const Stack = createStackNavigator();
  // set homescreen back to Home component
  return (

    <Stack.Navigator>
      <Stack.Screen name="Homescreen" component={Home} options={{
        title: null,
        headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraApp} options={{
        title: null,
        headerTransparent: true,
        headerBackTitleStyle: {
          color: 'white',
          },
          headerTintColor: "white"
      }}/>
      <Stack.Screen name='LoadingScreen' component={LoadingScreen} options={{
        title:null,
        headerShown:false}} />
      <Stack.Screen name='SearchResults' component={SearchResults} options={{
        title: null,
        headerShown: false }} />

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
