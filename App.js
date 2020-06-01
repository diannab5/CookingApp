import React from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import HomeNav from './components/Home/HomeNav';
import Profile from './components/Profile/Profile';
import FavouritesNav from './components/Favourites/FavouritesNav';
import MakeLaterNav from './components/MakeLater/MakeLaterNav';
import { createDrawerNavigator,
  } from '@react-navigation/drawer';



const Drawer = createDrawerNavigator();

export default function App() {

  console.disableYellowBox = true;
  return (
    
    <NavigationContainer >
      <Drawer.Navigator dinitialRouteName="Home" >
        <Drawer.Screen name="Home" component={HomeNav} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Favourites" component={FavouritesNav} />
        <Drawer.Screen name="Saved for Later" component={MakeLaterNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
