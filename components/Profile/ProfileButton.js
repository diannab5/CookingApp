import React, { useContext } from 'react'
import { AsyncStorage, Alert } from 'react-native'
import { Button } from 'galio-framework';
import { StorageContext } from '../../contexts/storageContext';

const ProfileButton = (props) => {
    const [state, setState] = useContext(StorageContext);
    const stringState = JSON.stringify(state)

  const storeData = async () => {
     try {
       await AsyncStorage.setItem('state', stringState );
     } catch (error) {
        console.log(error);
     }
   };

    return(
        <Button 
        shadowless size="small" 
        style={props.style}
        onPress={async () => {
            await storeData();
            Alert.alert("Done!", "Your preferences have been updated", [{text: "Close"}])
        }}
        >
        Save Settings
      </Button>

    )
};

export default ProfileButton;