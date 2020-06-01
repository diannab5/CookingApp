import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import { ModalContext } from '../../contexts/modalContext';

const list = [{
    value: '5'
  }, {
    value: '10'
  } , {
    value: '15'
  }]

let styles = StyleSheet.create({
    dropdown:{
        backgroundColor: "white",
        width: '80%',
        alignSelf: "center",
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1.5,
        borderColor: '#606060',
        borderRadius: 10,
        marginBottom:35,
      }
})


const DropdownNumberComponent = (props) => {
    const [numberState, setNumberState] = useContext(ModalContext);

    return(
      <Dropdown 
      label="Number of recipes"
      data={list}
      onChangeText={(value)=>{setNumberState(numberState => ({value}));}}
      containerStyle={styles.dropdown}
      />
    )
}
export default DropdownNumberComponent