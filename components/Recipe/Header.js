import React from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import toggleMakeLaterList from '../helpers/toggleMakeLaterList'
import toggleFavourites from '../helpers/toggleFavourites'
import { Block, Text, Button } from 'galio-framework';

const styles = StyleSheet.create({
  header: {
    height: 100,
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
})


export default function Header(props) {

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.recipe.title}</Text>
      <Text style={styles.time}>Ready in {props.recipe.time} minutes</Text>
      <Block style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>

      <Button style={{width:'25%', marginHorizontal:8, backgroundColor: props.saveState.color, shadowColor:'transparent', height:30, marginTop:10}} onPress={()=> {
        toggleMakeLaterList(props.recipe, props.recipe.id, props.saveState.saved ? false : true).then(res => Alert.alert("Saved!", "This recipe has been saved for later", [{text: "Done", onPress: () => props.toggleSave()}]));
      }}><Text style={{fontWeight:'bold', color:'white'}}>{props.saveState.text}</Text></Button>
        
      <Button style={{ width:'25%', marginHorizontal:8, backgroundColor: props.faveState.color, shadowColor:'transparent', height:30, marginTop:10}} onPress={() => {
        toggleFavourites(props.recipe, props.recipe.id, props.faveState.favourited ? false : true).then(res => Alert.alert("Saved!", "This recipe has been added to your Favourites", [{text: "Done", onPress: () => props.toggleFave()}]));
      }}><Text style={{fontWeight:'bold', color:'white'}}>{props.faveState.text}</Text></Button>

      </Block>
    </View>
  )
}