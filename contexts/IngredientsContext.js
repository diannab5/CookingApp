import React, {createContext, useState} from 'react';

const IngredientsContext = createContext([{}, () => {}]);

const  IngredientsContextProvider = (props) => {

  const [ingredients, setIngredients] = useState('');
  const [text, setText] = useState('');

  return (
    <IngredientsContext.Provider 
    value={[ingredients, setIngredients, text, setText]}
    >
    {props.children}
    </IngredientsContext.Provider>
  )
}


export {IngredientsContext, IngredientsContextProvider};