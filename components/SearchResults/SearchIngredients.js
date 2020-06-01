import React, { useState,useCallback ,useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { theme } from 'galio-framework'
import { FlatList, View, StyleSheet, Dimensions, Text, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
const { width: viewportWidth } = Dimensions.get('window');
import axios from 'axios'
import { getProfileStorageAsync } from '../helpers/getProfileStorageAsync';
import { getNumberStorageAsync } from '../helpers/getNumberStorageAsync';

import { IngredientsContext } from '../../contexts/IngredientsContext'
import loadingSpinner from '../photos/status.png'

export default function SearchIngredients(props){





  useFocusEffect(
    useCallback(() => {
      axios.get('https://lit-river-70719.herokuapp.com/')

      .then(res => {
        setIngredients(res.data[0])
        setRecipes(res.data.slice(1,));
      })
      .catch(err => console.log(err, "error"));
    },[])
  )

  const [isAnimated, setIsAnimated] = useState(new Animated.Value(0))
  const {recipes, setRecipes} = props;
  const {modalState, setModalState, whichModal, setWhichModal } = props;
  const [loadingState, setLoadingState] = useState(false); 
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const profileSettings = getProfileStorageAsync()
  .then(x => x)  
  .catch(x=>console.error(x));

  const numberSettings = getNumberStorageAsync()
  .then(x=>x)
  .catch(x=>console.log(x));
  
  const spin = isAnimated.interpolate({
    inputRange:[0,1],
    outputRange:['0deg', '360deg']
  })

  const searchAgain = () =>{
    setLoadingState(true);
    Animated.loop( Animated.timing(isAnimated, {
      toValue: 1, 
      duration: 1000, 
      easing: Easing.linear, 
      useNativeDriver: true, 
    }) ).start()
    
    
    // Animated.timing(isAnimated, {
    //   toValue:1,
    //   duration:1000,
    //   easing: Easing.linear,
    //   useNativeDriver: true
    // }).start()
  
    axios.post('https://lit-river-70719.herokuapp.com/recipes', {data:{ingredients, profileSettings, numberSettings}})
    .then((res)=>{
      setLoadingState(false);
      setRecipes(res.data.slice(1,));
      // setLoadingState(false);
    })
    .catch((err)=> {
      console.log(err, "axios err 2")
    });
  
  };

  return (
    <View style={styles.container}>
      <FlatList horizontal
        showsHorizontalScrollIndicator={false}
        data={ingredients}
        renderItem={({item}) => 
        <Button title={item} 
        onPress={()=> { setIngredients(ingredients.filter(ing => { if(ing != item){return ing} }))}}
        icon={
          <Icon
            name='window-close'
            size={20}
            color='white'
            style={{marginLeft:8, marginTop: 4}}
          />} 
          iconRight
          style={styles.button}
          buttonStyle={{backgroundColor:'darkgrey', borderRadius: 8}}/>}
          keyExtractor={item => item}
      />

  <View style={styles.secondtier}>
      <View style={{backgroundColor:'transparent', fontSize:16}}><Text style={{opacity:0}}>search again</Text></View>
      {!loadingState ?
      <Button 
      title ='Search Again'
      style={styles.searchButton}
      buttonStyle={{backgroundColor:'lightsalmon', padding: 10, borderRadius: 8}}
      onPress={searchAgain}
      >
      search Again
      </Button>
      :
      <Animated.Image 
      style={{transform:[{rotate:spin}], alignSelf:'center', height:'100%'}}
      source={require("../photos/status.png")}
      resizeMode="contain"
      />
      }
      

     
    <Button
      style={styles.insertButton}
      title="Add"
      titleStyle={{fontSize:16}}
      buttonStyle={{backgroundColor:'lightsalmon', padding: 11, borderRadius: 8, marginLeft:8}}
      onPress={()=>{
        setModalState(!modalState);
        setWhichModal('addModal')

      }}
      icon={<IconMI 
        name="library-add"
        size={18}
        color='white'
        
      />}
    
    >
   </Button>
      </View>
    </View>
  );
}
// animation: rotate 1s linear infinite;

const styles = StyleSheet.create({
  container:{
    margin: 15,
    padding: 15,
    minWidth: viewportWidth - 30,
    minHeight: 125,
    backgroundColor:'white',
    borderRadius:10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    position:'absolute',
    top:Dimensions.get('window').height-Dimensions.get('window').height/2.85
  },
  button:{
    alignSelf: "center",
    color:'white',
    width: 125,
    margin:2,

  },
  secondtier:{
    flexDirection:'row',
    justifyContent:'space-between',

  }, 
  searchButton :{
    // marginHorizontal: 25,
    // width:viewportWidth/2.5
    // alignSelf:'center',
    // position:'absolute',
    // top:0,
  },
  insertButton: {
    // top:0,
    // alignSelf:'flex-end',
  }

})
