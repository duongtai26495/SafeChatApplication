import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React,{useEffect, useState, useRef} from 'react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import SolidBgButton from '../../components/Button/SolidBgButton'
import main_styles from '../../assets/styles/main_styles'
import Colors from '../../assets/colors/Color'
import Authen_String from '../../constants/Authen_String'
import NAVI_STRING from '../../constants/Navigate_String'
import { StackActions } from '@react-navigation/native'
const Profile = ({navigation, route}) => {
const auth = getAuth()
  useEffect(()=>{
    checkUserLogin()
  },[])

  const checkUserLogin = () =>{
    onAuthStateChanged(auth, (user)=>{
      if(user){

      }else{
        navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
      }
    })
  }
  const signOut = () =>{
    auth.signOut().then(()=>{
      checkUserLogin()
    })
  }

  return (
   <SafeAreaView>
      <SolidBgButton
     active={()=>{signOut()}}
     backgroundSolidColor={Colors.PRIMARY}
     titleButton={Authen_String.SIGNOUT}
     colorText={Colors.DARK}/>
   </SafeAreaView>
  )
}

export default Profile