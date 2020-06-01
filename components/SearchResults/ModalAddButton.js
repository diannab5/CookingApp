import React, { useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { Button } from 'galio-framework';
import {ModalContext} from '../../contexts/modalContext'

const ModalAddButton = (props) => {
    const [numberState, setNumberState] = useContext(ModalContext);
    const stringNumberState = JSON.stringify(numberState)

    const storeData = async () => {
       
       props.setAddState(!props.AddState)
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

export default ModalAddButton;