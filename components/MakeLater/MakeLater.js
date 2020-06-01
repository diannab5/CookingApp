import React, {useState, useCallback} from 'react';
import ClearSaved from './ClearSaved';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage, ImageBackground, View } from 'react-native';
import { Card, Block, NavBar, Icon, theme, Text } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';
import background from '../photos/food3.jpg'
import background1 from '../photos/carbon-fibre-v2.png'
const { width, height } = Dimensions.get('screen');
import { getSavedAsync } from '../helpers/getSavedAsync';
import { pushSavedRecipes } from '../helpers/pushSavedRecipes';



export default function MakeLater(props) {
  
  const [state, setState] = useState("")
  const recipes = pushSavedRecipes(state)

  useFocusEffect(
    useCallback(() => {
     getSavedAsync().then((savedState) => {setState(state=>({...savedState }))}) 

    },[])
  )

    return (
      <Block safe flex style={{ backgroundColor: '#F0F0F0' }}>
        <NavBar style = {styles.nav}
          title="Saved Recipes"
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
          <ImageBackground source={background1} style={styles.backgroundImage} resizeMode='repeat'>
          {recipes.length !== 0 
          ? null 
          : <ImageBackground source={background} style={styles.backgroundImage}>           
            <View style={styles.emptyList}>
              <Text h5 style={styles.heading}>Your List Is Empty!</Text>
              <Text h6 style={styles.text}>Select Recipes To Make Later</Text>
            </View></ImageBackground>}
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {recipes && recipes.map((recipe, id) => (
                <TouchableOpacity style={styles.card} onPress={() => {props.navigation.navigate('savedRecipe', {recipe});}} >
                <Card
                  key={recipe.id}
                  avatar='https://storage.needpix.com/rsynced_images/ribbon-1202758_1280.png'
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
      //display: display,
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