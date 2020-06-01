import React, { useContext } from 'react'
import {Input} from 'galio-framework'
import { StorageContext } from '../../contexts/storageContext';

const ProfileInput = () => {
    const [state, setState] = useContext(StorageContext);
    const stateSetter =  (value) => {
        setState(state =>({...state, allergies:value}))
    }

    return(
        <Input
        onChangeText={stateSetter}
        style={{alignSelf:'center', height: 55, width:'80%', label:'white', padding:10, marginVertical:5, borderWidth:1.5, borderColor:'#606060'}}
        placeholder="Allergies, Comma-seperated"
        family="antdesign"
        color='black'
        />
        
    )
}

export default ProfileInput;