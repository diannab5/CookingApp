
import React, {useState} from 'react';
import {  Dimensions, ScrollView, View, FlatList, StyleSheet, Image, Alert } from 'react-native';
import  RecipeCard from './InstructionCard';
import IngredientList from './IngredientList';
import {toggleMakeLaterList} from '../helpers/toggleMakeLaterList';
import {toggleFavourites} from '../helpers/toggleFavourites';
import { Block, theme, Text, Button} from 'galio-framework';
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
      fontSize: 15,
      fontStyle: 'italic'
    }
  });


export default function Recipe({route, navigation}){
  const {recipe} = route.params
  const ingredients = formatIngredients(recipe.missedIngredients, recipe.usedIngredients)
  const [state, setState] = useState({
    favourited: false, 
    makeLater: false, 
    faveColor: "lightsalmon", 
    makeLaterColor: "lightsalmon",
    faveText: "Favourite", 
    makeLaterText: "Save for later"
  })

  const toggleFave = () => {
    const {favourited} = state
      
    if (favourited) {
      setState(prevState => ({
        ...prevState, favourited: false, faveColor: "lightsalmon", faveText: "Favourite"
      }))
      } else {
        setState(prevState => ({
          ...prevState, favourited: true, faveColor: "grey", faveText: "Favourited"
        })
      )
    }
  }

  const toggleMakeLater = () => {
    const {makeLater} = state

    if (makeLater) {
      setState(prevState => ({
        ...prevState, makeLater: false, makeLaterColor: "lightsalmon", makeLaterText: "Save for later"
      }))
    } else {
      setState(prevState => ({
        ...prevState, makeLater: true, makeLaterColor: "grey", makeLaterText: "Saved"
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
              <Button style={{width:'25%', marginHorizontal:8, backgroundColor: state.makeLaterColor, shadowColor:'transparent', height:30, marginTop:10}} onPress={()=> {
          toggleMakeLaterList(recipe, recipe.id, state.makeLater ? false : true).then(res => Alert.alert("Done!", "Your preferences have been updated", [{text: "Close", onPress: () => toggleMakeLater()}]));}}>
              <Text style={{fontWeight:'bold', color:'white'}}>{state.makeLaterText}</Text></Button>
              <Button style={{ width:'25%', marginHorizontal:8, backgroundColor: state.faveColor, shadowColor:'transparent', height:30, marginTop:10}} onPress={() => {
          toggleFavourites(recipe, recipe.id, state.favourited ? false : true).then(res => Alert.alert("Done!", "Your preferences have been updated", [{text: "Close", onPress: () => toggleFave()}]));}}>
              <Text style={{fontWeight:'bold', color:'white'}}>{state.faveText}</Text></Button>
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
                renderItem={({ item }) => <RecipeCard title={item.number} step={item.step} />}/>
        </View>
      </View>
      </ScrollView>
    </Block>
  )
}
