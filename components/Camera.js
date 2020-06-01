import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import io from "socket.io-client";
import { getProfileStorageAsync } from './helpers/getProfileStorageAsync';
import { getNumberStorageAsync } from './helpers/getNumberStorageAsync';



export default function CameraApp (props){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [spinner, setSpinner] = useState(false);
  const [display, setDisplay] = useState('flex');

  const profileSettings = getProfileStorageAsync()
  .then(x => x)  
  .catch(x=>console.error(x));
  const numberSettings = getNumberStorageAsync()
  .then(x=>x)
  .catch(x=>console.log(x));


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    }, []);
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref=>{this.camera = ref}}>
        <View style={{flex:1, flexDirection:"column",justifyContent:"flex-end",margin:20}}>
          <TouchableOpacity
            style = {{alignSelf: 'center', backgroundColor: 'transparent'}}
            onPress = {
              async () => {
              setSpinner(true);
              setDisplay('none')
              const options = {
                base64: true
              }
              if(this.camera) {
                let photo = await this.camera.takePictureAsync(options);
                props.navigation.replace("LoadingScreen", {photo:photo.base64, state:props.route.params.state, profileState: profileSettings, numberState:numberSettings})
     
              } 
            }}>
            <ActivityIndicator size="large" color="#FFFFFF" animating={spinner} style={styles.spinner}/>
            <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40, display: display}}/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

let styles = StyleSheet.create({
  spinner:{
    zIndex: 1
  }
})

