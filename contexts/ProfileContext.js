import React, {createContext, useState} from 'react';

const ProfileContext = createContext([{}, () => {}]);

const  ProfileContextProvider = (props) => {

  const [state, setState] = useState({
    time: "Any",
    cuisine: "Any",
  });

  return (
    <ProfileContext.Provider 
    value={[state, setState]}
    >
    {props.children}
    </ProfileContext.Provider>
  )
}


export {ProfileContext, ProfileContextProvider};