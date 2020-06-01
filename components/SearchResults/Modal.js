import React, { useState, useCallback, useContext } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text } from 'galio-framework';
import DropdownNumberComponent from './DropdownNumber';
import {ModalContextProvider} from '../../contexts/modalContext';
import ModalTextInput from './ModalTextInput';
import { IngredientsContext, IngredientsContextProvider } from '../../contexts/IngredientsContext'
// THIS FILE IS UNUSED //

const Modal = (props) => {
  const {modalState,whichModal, errorState } = props
  const [ingredients, setIngredients, text, setText] = useContext(IngredientsContext);


    return (
    <IngredientsContextProvider>
      <Modal isVisible={modalState} style={{maxHeight:300, maxWidth:300, marginLeft:37, marginTop:100, backgroundColor:'white'}} onBackdropPress={()=>setModalState(!modalState)}>
        <View style={{ flex: 1, justifyContent:'space-around'}}>
          <ModalContextProvider>
            <Text style={styles.modalText}>{whichModal==='addModal' ? 'Add more ingredients to your next search!' : 'Change the number of recipes generated'}</Text>
          <Text>{whichModal==='addModal' ? 'Use singular tense only (i.e "Potato"}' : 'Please allow for additional time when increasing the number of recipes'}</Text>
            {whichModal==='addModal' ?
              <View>
               <ModalTextInput ingredients={ingredients} errorState={errorState} setErrorState={setErrorState}/>
               <Text style={errorState ? {display:'none'} : {color:'red'}}>Field cannot be blank</Text>
              </View>
              :
               <DropdownNumberComponent/>}
            <ModalButton buttonLabel='Close' modalState={modalState} setModalState={setModalState} setNumberStorage={whichModal==='addModal' ? addNewIngredient : setNumberStorage}/>
            {/* <ModalNumberButton modalState={modalState} setModalState={setModalState}/> */}
          </ModalContextProvider>
        </View>
      </Modal>
    </IngredientsContextProvider>
    )
};

export default Modal

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
  