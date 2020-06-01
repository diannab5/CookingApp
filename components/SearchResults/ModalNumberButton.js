import React, { useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { Button } from 'galio-framework';
import {ModalContext} from '../../contexts/modalContext'

const ModalNumberButton = (props) => {
    const [numberState, setNumberState] = useContext(ModalContext);
    const stringNumberState = JSON.stringify(numberState)
    const storeData = async () => {
       try {

         await AsyncStorage.setItem('number', stringNumberState );
       } catch (error) {
          console.log(error);
       }
       props.setModalState(!props.modalState)
     };

    return(
        <Button 
        shadowless size="small" 
        onPress={storeData}
        style={{alignSelf:'center', backgroundColor:'lightsalmon'}}
        >
        Save Settings
      </Button>

    )
};

export default ModalNumberButton;