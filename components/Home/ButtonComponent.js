import React, { useContext, useState } from 'react'
import { Button } from 'galio-framework';
import { ProfileContext } from '../../contexts/ProfileContext';

const ButtonComponent = (props) => {
    const [state, setState] = useContext(ProfileContext);
    const [navigation, setNav] = useState(props.navigation)

    return(
        <Button 
        shadowless 
        size="small" 
        color='info'
        iconSize={50}
        style={props.style} 
        onPress={() => {props.navigation.navigate(`${props.screen}`, {state: state, navigation:navigation});}} 
        >
          {props.label}
      </Button>
    )
}

export default ButtonComponent