import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


import { DrawerNavigator, StackNavigator} from 'react-navigation'
import CameraApp from './components/Camera'
import Home  from './components/Home' 

import Profile from './components/Profile'



export const Stack = StackNavigator({
    Home: { screen: Home },
    Camera: { screen: CameraApp },
  }, {
    initialRouteName: 'Home'
  })


export const Drawer = DrawerNavigator({
    Stack: { screen: Stack },
    Profile: { screen: Profile }
    
})