import React, {createContext, useState} from 'react';

const ModalContext = createContext([{}, () => {}]);

const  ModalContextProvider = (props) => {

  const [numberState, setNumberState] = useState({
      value:"5"
  });
  

  return (
    <ModalContext.Provider 
    value={[numberState, setNumberState]}
    >
    {props.children}
    </ModalContext.Provider>
  )
}


export {ModalContext, ModalContextProvider};