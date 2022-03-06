import { View, Text, SafeAreaView, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import main_styles from '../../assets/styles/main_styles'
import NAVI_STRING from '../../constants/Navigate_String'
import Authen_String from '../../constants/Authen_String'
import firebase_config from '../../config/firebase_config'
import SolidBgButton from '../../components/Button/SolidBgButton'
import Colors from '../../assets/colors/Color'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { StackActions } from '@react-navigation/native'
const Home = ({navigation, route}) => {

  const checkLoginState = () =>{
    const auth = getAuth()
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const uid = user.uid
        console.log("User logged in: "+uid)
      }else{
        console.log("User unlogin!");
        navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
      }
    })
  }

  const signOut = () =>{
    const auth = getAuth()
    auth.signOut().then(() => {
      navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
    })
  }

  useEffect(()=>{
    if(firebase_config){
      console.log("Connected")
      checkLoginState()
    }else{
      console.log("Unconnect")
    }
  })

  const goToSignIn = () =>{
    console.log(Authen_String.SIGNIN)
    navigation.navigate(NAVI_STRING.SIGNIN)
  }


  return (
    <SafeAreaView style={main_styles.container}>
      <SolidBgButton
     active={()=>{signOut()}}
     backgroundSolidColor={Colors.PRIMARY}
     titleButton={Authen_String.SIGNOUT}
     colorText={Colors.DARK}/>
    </SafeAreaView>
  )
}

export default Home