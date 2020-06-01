import React, {useEffect, useState, useCallback} from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage, ImageBackground, View } from 'react-native';
import { Card, Block, NavBar, Icon, theme, Text } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';
import ClearFaves from './ClearFaves';
import background from '../photos/food3.jpg'
import background1 from '../photos/carbon-fibre-v2.png'
const { width, height } = Dimensions.get('screen');
import { getFavouritesAsync } from '../helpers/getFavouritesAsync';
import { pushFavouritesRecipes } from '../helpers/pushFavouritesRecipes';

export default function Favourites (props){

const [state, setState] = useState("")
const recipes = pushFavouritesRecipes(state);
const [display, setDisplay] = useState('none')


const styles = StyleSheet.create({
  cards: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardBackground:{
    backgroundColor: theme.COLORS.WHITE,
  },
  card: {
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  nav: {
    backgroundColor: "lightsalmon",
  },
  backgroundImage: {
    width:'100%',
    height:'100%'
  },
  emptyList : {
    alignSelf: 'center',
    backgroundColor:'rgba(255, 255, 255, 0.90)',
    padding:20,
    borderColor: "lightsalmon",
    borderWidth: 8,
    width: width * .80,
    height: height * .65,
    borderRadius: 20,
    justifyContent:'center',
    marginTop: height * .11
  },
  heading: {
    textAlign: "center",
    color: '#606060',
    lineHeight:40
  },
  text : {
    textAlign: "center",
    color: 'grey',
    fontSize: 15
  }
});
  
  useEffect(()=>{state ? setDisplay('none') : setDisplay('flex')},[state])
  useFocusEffect(
    useCallback(() => {
      getFavouritesAsync().then((favouritesState) => {setState(state=>({...favouritesState }))}) 
    
    },[])
  )

    return (
      <Block safe flex style={{ backgroundColor:'#F0F0F0' }}>
      <NavBar style = {styles.nav}
          title="Favourites"
          left={(
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Icon 
                name="menu"
                family="feather"
                size={25}
                color={theme.COLORS.WHITE}
                />
            </TouchableOpacity>
          )}
          titleStyle={{ color:'white', fontSize:30, fontFamily: 'Baskerville-Bold'  }}/>
          {/* <Button onPress={ClearFaves}/> */}
          <ImageBackground source={background1} style={styles.backgroundImage} resizeMode='repeat'>
          {recipes.length !== 0 
          ? null 
          : <ImageBackground source={background} style={styles.backgroundImage}>           
            <View style={styles.emptyList}>
              <Text h5 style={styles.heading}>Your Favourites Is Empty!</Text>
              <Text h6 style={styles.text}>Pick Your Favourites To See Them Here</Text>
            </View></ImageBackground>}
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {recipes && recipes.map((recipe, id) => (
                <TouchableOpacity style={styles.card} onPress={() => {props.navigation.navigate('faveRecipe', {recipe});}}>
                <Card
                  key={recipe.id}
                  avatar='https://storage.needpix.com/rsynced_images/pale-pink-heart.jpg'
                  title={recipe.title.toUpperCase()}
                  borderless
                  shadowColor={theme.COLORS.BLACK}
                  style={styles.cardBackground}
                  caption={`Ready in ${recipe.time} minutes`}
                  image={recipe.illustration}
                  imageBlockStyle={[styles.noRadius]}
                  footerStyle={{paddingLeft: 5, marginRight:70}}
                >
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
        </ImageBackground>
      </Block>
    );
  }

