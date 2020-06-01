import React, { useState } from 'react';
import { View, TouchableOpacity,ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { theme, NavBar ,Icon, Block, Text } from 'galio-framework'
import ProfileButton from './ProfileButton'
import ProfileSwitch from './ProfileSwitch'
import ProfileInput from './ProfileTextInput'
import ProfileIntolerances from './CheckboxIntolerances'
import DropdownDietComponent from './DropdownDiet';
import { StorageContextProvider } from '../../contexts/storageContext';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';


let styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:'100%'
  },
  button: {
    alignSelf: "center",
    borderRadius:10,
  },
  dropdown:{
    backgroundColor: "white",
    width: '80%',
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical:30,
    borderRadius:10,
    borderWidth: 1.5,
    borderColor: '#606060'
  },
  nav : {
    backgroundColor: 'lightsalmon',
  },
  
});

export default function Profile(props){
  const [selected, setSelected] = useState(new Map());
  // const navRoutes = useNavigationState(state => state);

  return(
    <Block safe>
      <ImageBackground source={require("../photos/food3.jpg")} style={styles.backgroundImage}>
        <NavBar style = {styles.nav}
            title="Profile"
            left={(
              <TouchableOpacity onPress={() => {
                props.navigation.openDrawer();
                // console.log("----------------");
                // console.log(navRoutes.history[navRoutes.history.length-1]);
                // console.log("----------------");
              }}>
                <Icon 
                  name="menu"
                  family="feather"
                  size={30}
                  color={theme.COLORS.WHITE}
                />
              </TouchableOpacity>
            )}
            titleStyle={{ color:'white', fontSize:30, fontFamily: 'Baskerville-Bold' }}
        />
      <StorageContextProvider>
      <ScrollView containerStyle={{flex:1, justifyContent:'space-around'}}>
      <View style={{padding:10}}>
          <DropdownDietComponent style={styles.dropdown}/>
          <ProfileInput/>
            <View>
              <ProfileIntolerances state={[selected, setSelected]}/>
            </View>
        <ProfileSwitch /> 
        <Text style={{marginLeft: '3%', marginRight: '3%', marginBottom: '10%', textAlign: 'center', alignSelf:'center', color:'white', fontSize:12,textShadowOffset:{width:-1, height:1}, textShadowColor:'rgba(0, 0, 0, 1)',textShadowRadius: 10}}>
        Turn the switch on to include common pantry items (ie. water, sugar, salt, etc) in your recipe search

        </Text>
        <ProfileButton state={[selected, setSelected]} style={{alignSelf:'center', width:'55%', backgroundColor:'lightsalmon',borderRadius:10}}/>
      </View>
      </ScrollView>         
      </StorageContextProvider>
      </ImageBackground>
    </Block>
  )

}