const setNumberStorage = async (modal, setModal) => {
    try {
      await AsyncStorage.setItem('number', stringNumberState );
    } catch (error) {
       console.log(error);
    }
    setModal(!modal)
  };

  export default setNumberStorage