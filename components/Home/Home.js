import React from 'react';
import { ProfileContextProvider } from '../../contexts/ProfileContext';
import DropdownCuisineComponent from './DropdownCuisine';
import DropdownTimeComponent from './DropDownTime'
import ButtonComponent from './ButtonComponent';
import { TouchableOpacity, ImageBackground, StyleSheet, Image, View, Dimensions } from 'react-native';
import { NavBar, Icon, Block } from 'galio-framework';
import background from '../photos/food3.jpg'
import logo from '../photos/logo2.png';


export default function Home ({navigation}){
  const {width}  = Dimensions.get('screen');

  let styles = StyleSheet.create({
    backgroundImage: {
      width:'100%',
      height:'100%',
      flexDirection: 'column',
    },
    button: {
      alignSelf: "center",
      backgroundColor: 'lightsalmon',
      width:width/2.5,
      borderRadius:10,
      marginVertical:30,
    },
    dropdown:{
      backgroundColor: "white",
      width: '80%',
      alignSelf: "center",
      paddingLeft: 7,
      paddingRight: 7,
      borderWidth: 1.5,
      borderColor: '#606060',
      borderRadius: 10
    },
    buttonContainer: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-evenly'
    }
  });

  let cuisine = [{
    value: 'Any',
  }, {
    value: 'Italian',
  }, {
    value: 'Mexican',
  }, {
    value: 'Chinese',
  }, {
    value: 'American',
  }, {
    value: 'Japanese',
  }, {
    value: 'Mediterranean',
  }, {
    value: 'Indian',
  }, {
    value: 'Thai',
  }, {
    value: 'Korean',
  }];

  let time = [{
    value: 'Any'
  }, {
    value: '30 minutes or less'
  } , {
    value: '60 minutes or less'
  }]

  return (
    <Block safe>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <NavBar
            title={null}
            transparent={true}
            left={(
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon 
                  name="menu"
                  family="feather"
                  size={30}
                  color='#606060'
                />
              </TouchableOpacity>
            )}
            style={{marginTop:10}}
          />

        <Image source={logo} style={{width:280, height:280, alignSelf:'center'}} />
        <View style={{flex:1, justifyContent:'space-evenly'}}>
          <ProfileContextProvider> 
            <DropdownTimeComponent 
            list={time} 
            style={styles.dropdown}
            value={time[0]}
            label="Ready in..." />
            <DropdownCuisineComponent 
            list={cuisine} 
            style={styles.dropdown}
            label="Select Cuisine" />

              <View style={styles.buttonContainer}>

            <ButtonComponent 
            style={styles.button} 
            navigation={navigation}
            screen='Camera'
            label='Camera'/>

            <ButtonComponent 
            style={styles.button}
            navigation={navigation}
            screen='SearchResults'
            label='Manual Selection'
            />

              </View>




          </ProfileContextProvider>
        </View>
      </ImageBackground>
    </Block>
  )
}
