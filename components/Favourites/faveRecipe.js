import React, {useState, useCallback} from 'react';
import {  Dimensions, ScrollView, View, FlatList, StyleSheet, Image, Alert } from 'react-native';
import  RecipeCard from '../Recipe/InstructionCard';
import IngredientList from '../Recipe/IngredientList';
import {toggleMakeLaterList} from '../helpers/toggleMakeLaterList';
import {toggleFavourites} from '../helpers/toggleFavourites';
import {getSavedAsync} from '../helpers/getSavedAsync';
import { Block, theme, Text, Button } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';
import  formatSummary  from '../helpers/formatSummary';
import  formatIngredients  from '../helpers/formatIngredients';


const IS_IOS = Platform.OS === 'ios';
const entryBorderRadius = 8;
const {width}  = Dimensions.get('screen');
const imageHeight = Math.round(Dimensions.width * 9 / 16);
const imageWidth = Dimensions.width;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    summary: {
      padding: 30,
      textAlign: "justify",
      marginVertical:20,
      paddingBottom:0
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      height: imageHeight, 
      width: imageWidth,
      borderRadius: IS_IOS ? entryBorderRadius : 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
    },
    header: {
      height: 120,
      paddingTop: 28,
      paddingBottom: 28,
      backgroundColor: 'white'
    },
    title: {
      textAlign: "center", 
      color: "black",
      fontSize: 18,
      fontWeight: "bold"
    },
    time: {
      textAlign: "center",
      marginTop: 6,
      color: 'gray',
      fontSize: 13,
      fontStyle: 'italic'
    }
  });


export default function faveRecipe({route, navigation}){
  
  const {recipe} = route.params
  const [savedState, setSavedRecipes] = useState("")
  const savedObj = Object.keys(savedState);
  const saved = []
  for (let num of savedObj) {
    saved.push(Number(num))
  } 


  useFocusEffect(
    useCallback(() => {
     getSavedAsync().then((savedState) => {setSavedRecipes(state=>({...savedState}))}) 
    },[saved])
  )
 
  const ingredients = formatIngredients(recipe.missedIngredients, recipe.usedIngredients)

  const [faveState, setFaveState] = useState({
    favourited: true,
    text: "Favourited",
    color: "grey"
  })
      
  const toggleFave = () => {
    const {favourited} = faveState;
      
    if (favourited) {
      setFaveState(prevState => ({
        favourited: false,
        text: "Favourite",
        color: "lightsalmon"
        }))
      } else {
        setFaveState(prevState => ({
          favourited: true, 
          text: "Favourited",
          color: "grey"
        }))
      }
  }

  return(
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
     <ScrollView style={{height:300}}>
      <Image source={{uri: recipe.illustration}}
       style={{width: 414, height: 300}} />
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.time}>Ready in {recipe.time} minutes</Text>
      <Block style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>

      <Button style={{width:width/3, marginHorizontal:8, backgroundColor: saved.includes(recipe.id) ? "grey" : "lightsalmon", shadowColor:'transparent', height:30, marginTop:10}} onPress={()=> {
        toggleMakeLaterList(recipe, recipe.id, saved.includes(recipe.id) ? false : true).then(res => Alert.alert("Done!", "Your preferences have been updated", [{text: "Close", onPress: () => console.log("alert closed")}]));
        console.log(width);
      }}><Text style={{fontWeight:'bold', color:'white'}}>{saved.includes(recipe.id) ? "Saved" : "Save for later"}</Text></Button>
        
      <Button style={{ width:width/3, marginHorizontal:8, backgroundColor: faveState.color, shadowColor:'transparent', height:30, marginTop:10}} onPress={() => {
        toggleFavourites(recipe, recipe.id, faveState.favourited ? false : true).then(res => Alert.alert("Done!", "Your preferences have been updated", [{text: "Close", onPress: () => toggleFave()}]));
      }}><Text style={{fontWeight:'bold', color:'white'}}>{faveState.text}</Text></Button>

      </Block>
    </View>
      <Text style={styles.summary}>{formatSummary(recipe.summary)}</Text>
      <View style={{paddingBottom:15, padding:10}}>
        <Text style={{padding: 20, fontSize: 25, fontWeight: "bold", color:'lightsalmon'}}>Ingredients</Text>
        <FlatList
            data={ingredients}
            renderItem={({ item }) => <IngredientList name={item} />}
          />
        <Text style={{padding: 20, fontSize: 25, fontWeight: "bold", color:'lightsalmon'}}>Directions</Text>
          <FlatList
            data={recipe.instructions[0].steps}
            renderItem={({ item }) => <RecipeCard title={item.number} step={item.step} />}
          />
        </View>
      </View>
      </ScrollView>
    </Block>
  )
}

