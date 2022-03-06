/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react';
import MainTab from './src/navigation/MainTab';
import firebase_config from './src/config/firebase_config'
const App = () => {
  useEffect(()=>{
    if(firebase_config){
      console.log("Connected")
    }else{
      console.log("Disconnect")
    }
  })

  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>

  );
}
export default App;
