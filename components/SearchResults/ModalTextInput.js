import React, {useContext, useState} from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Button, Icon, theme, Text } from 'galio-framework';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';
import { IngredientsContext } from '../../contexts/IngredientsContext'

const styles = StyleSheet.create({
    container:{
      display:'flex',
      flexDirection:'row',
      width:'80%',
      marginHorizontal:'10%',
      borderRadius:15,
      borderColor:'black',
      borderWidth:1.75,
      height:50,
      // borderRadius:50
    
    },
    textInput:{
      borderBottomLeftRadius:15,
      borderTopLeftRadius:15,
      backgroundColor:'white',
      width:'75%',
      padding:10,
    },
    button: {
      height:46,
      width:59,
      borderBottomRightRadius:13,
      borderBottomLeftRadius:0,
      borderTopLeftRadius:0,
      borderTopRightRadius:13,
      backgroundColor:'lightsalmon',
      display:'flex',
      flexDirection:"row",
      
      
    }
});


const ModalTextInput = (props) => {
  // const [ingredients, setIngredients] = useState(props.ingredients);
  const [ingredients, setIngredients, text, setText] = useContext(IngredientsContext);
  const {errorState, setErrorState} = props;

  const addIngredients = () => { 
    if(text.length > 1 ) {
      setIngredients(prev => ([...prev, text.toLowerCase()]));
      Keyboard.dismiss();
      setText('');
      setErrorState(false);
    } else {
      setErrorState(true);
      
    }

  };
  //1- onPress={addIngredients}
  //2- onPress={()=>{setState}}

    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.textInput}
            value={text}
            placeholder='add new ingredients!'
            onChangeText={text => setText(text)}
            />
            <Button
            style={styles.button}
            onPress={addIngredients}
            shadowless={true}
            >
              <Icon 
                name="library-add"
                family="MaterialIcons"
                size={18}
                color={theme.COLORS.WHITE}
              />
            <Text style={{color:'white'}}> Add</Text>
              
            </Button>
            
        </View>
    )
};

export default ModalTextInput