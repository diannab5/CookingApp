import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MakeLater from './MakeLater';
import savedRecipe from './savedRecipe';



export default function MakeLaterNav ({navigation}){
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Make Later" component={MakeLater} options={{
        title: null,
        headerShown: false }} />
      <Stack.Screen name="savedRecipe" component={savedRecipe} options={{
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
