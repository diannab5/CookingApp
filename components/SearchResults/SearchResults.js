import MyCarousel from './SearchResultCards'
import React, { useState, useCallback, useContext } from 'react';
import SearchIngredients from './SearchIngredients';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { NavBar, Icon, theme, Text } from 'galio-framework';
import axios from 'axios';
import background from '../photos/food3.jpg';
import background1 from '../photos/carbon-fibre-v2.png';
const { width, height } = Dimensions.get('screen');
import { getFavouritesAsync } from '../helpers/getFavouritesAsync';
import { getSavedAsync } from '../helpers/getSavedAsync';
import Modal from 'react-native-modal';
import ModalButton from './ModalButton';
import DropdownNumberComponent from './DropdownNumber';
import {ModalContextProvider} from '../../contexts/modalContext';
import ModalTextInput from './ModalTextInput';
import { AsyncStorage } from 'react-native'
import { IngredientsContextProvider } from '../../contexts/IngredientsContext'
import { StackActions } from '@react-navigation/native';


const setNumberStorage = async (modal, setModal, setError, numState) => {
  try {
    let stringNumberState = JSON.stringify(numState)
    await AsyncStorage.setItem('number', stringNumberState );
  } catch (error) {
     console.log(error);
  }
  console.log(numState)
  setModal(!modal)
};

const addNewIngredient = (modal, setModal, setError) => {
  setError(false);
  setModal(!modal);
}

export default function SearchResults(props){


  // useFocusEffect(
  //   useCallback(() => {
  //     axios.get('https://lit-river-70719.herokuapp.com/')

  //     .then(res => {
  //       console.log(ingredients);
  //       setIngredients(res.data[0])
  //       setRecipes(res.data.slice(1,));
  //       console.log(ingredients)
  //     })
  //     .catch(err => console.log(err, "error"));
  //   },[])
  // )

  //Get current favourited recipes
  useFocusEffect(
    useCallback(() => {
      getFavouritesAsync().then((faveRecipes) => {setFaveRecipes(state=>(faveRecipes))}) 
    }, [])
  )
  
  //Get current saved recipes
  useFocusEffect(
    useCallback(() => {
      getSavedAsync().then((savedRecipes) => {setSavedRecipes(state=>(savedRecipes))}) 
    }, [])
  )

  const [recipes, setRecipes] = useState([]);
  // const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [faveRecipes, setFaveRecipes] = useState("");
  const [savedRecipes, setSavedRecipes] = useState("");
  const [modalState, setModalState] = useState(false)
  const [whichModal, setWhichModal] = useState('');
  const [errorState, setErrorState] = useState(false);

  const params = props.route.params

  const filteredRecipes = (original, faves, saves) => {
    if (faves === null & saves === null) {
      return original
    } else if (faves !== null && saves === null){
      return original.filter( recipe => !faves[recipe.id] )
    } else if (faves === null && saves !== null) {
      return original.filter(recipe => !saves[recipe.id] )
    } else {
      return original.filter(recipe => !faves[recipe.id] && !saves[recipe.id])
    }
  }

  return(
    <SafeAreaView>
      <NavBar safe style = {styles.nav}
          title="Recipes"
          left={(
            // props.navigation.openDrawer()
            <TouchableOpacity onPress={() =>props.navigation.dispatch(StackActions.popToTop())}>
              <Icon 
                name="home"
                family="AntDesign"
                size={25}
                color={theme.COLORS.WHITE}
              />
            </TouchableOpacity>
          )}
          right={(
            <TouchableOpacity onPress={()=>{
              setModalState(!modalState);
              setWhichModal('numModal')
              }}>
              <Icon 
                name="playlist-add"
                family="MaterialIcons"
                size={25}
                color={theme.COLORS.WHITE}
              />


            </TouchableOpacity>
          )}
          titleStyle={{ color:'white', fontSize:30, fontFamily: 'Baskerville-Bold' }}/>
      <ImageBackground source={background1} style={styles.backgroundImage} resizeMode='repeat'>



{/* modal */}
    
    <IngredientsContextProvider>
      
      <Modal isVisible={modalState} style={{maxHeight:height/1.85, maxWidth:width/1.25, marginLeft:37, marginTop:100, backgroundColor:'white'}} onBackdropPress={()=>setModalState(!modalState)}>
        <View style={{ flex: 1, justifyContent:'space-around'}}>
          <ModalContextProvider>
            
            <Text style={styles.modalText}>{whichModal==='addModal' ? 'Add more ingredients to your next search!' : 'Change the number of recipes generated'}</Text>
            <Text style={{alignSelf:'center'}}>{whichModal==='addModal' ? 'Use singular tense only (i.e "Potato"}' : 'Please allow for additional time when increasing the number of recipes'}</Text>

            {whichModal==='addModal' ?
              <View>
               <ModalTextInput errorState={errorState} setErrorState={setErrorState}/>
               <Text style={errorState ? {color:'red',alignSelf:'center'} : {color:'transparent'}}>Field cannot be blank</Text>
              </View>
              :
               <DropdownNumberComponent/>}
            <ModalButton buttonLabel={whichModal==='addModal' ? 'Close' : 'Save Settings'} setErrorState={setErrorState} modalState={modalState} setModalState={setModalState} setStorage={whichModal==='addModal' ? addNewIngredient : setNumberStorage}/>
            {/* <ModalNumberButton modalState={modalState} setModalState={setModalState}/> */}
          </ModalContextProvider>
        </View>
      </Modal>
{/* modal */}



      <View style={{backgroundColor:'#F0F0F0'}}>
      {recipes.length !== 0 
          ? <><MyCarousel recipes={filteredRecipes(recipes, faveRecipes, savedRecipes)} navigation={props.navigation}/>
            <SearchIngredients whichModal={whichModal} setWhichModal={setWhichModal} setModalState={setModalState} modalState={modalState} params={params} setRecipes={setRecipes} recipes={filteredRecipes(recipes, faveRecipes, savedRecipes)}/></>
          : <ImageBackground source={background} style={styles.backgroundImage}>           
            <View style={styles.emptyList}>
              <Text h5 style={styles.heading}>No Recipes Found!</Text>
              <Text h6 style={styles.text}>Please Take Another Photo</Text>
            </View> 
            <SearchIngredients whichModal={whichModal} setWhichModal={setWhichModal} setModalState={setModalState} modalState={modalState} setRecipes={setRecipes} />


            </ImageBackground>}

      </View>

      </IngredientsContextProvider>

      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  nav : {
    backgroundColor: 'lightsalmon'
  },
  backgroundImage: {
    width:'100%',
    height:'100%',
    zIndex: -1
  },
  emptyList : {
    alignSelf: 'center',
    backgroundColor:'rgba(255, 255, 255, 0.90)',
    padding:20,
    borderColor: "lightsalmon",
    borderWidth: 8,
    width: width * .80,
    height: height * .58,
    borderRadius: 20,
    justifyContent:'center',
    marginTop: height * .05
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
  },
  modalText : {
    marginHorizontal: 15,
    textAlign:'center', 
    marginTop: 35,
    fontSize:25,
  },
  
});
