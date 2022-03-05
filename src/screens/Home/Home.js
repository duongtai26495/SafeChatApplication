import { View, Text, SafeAreaView, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import main_styles from '../../assets/styles/main_styles'
import NAVI_STRING from '../../constants/Navigate_String'
import Authen_String from '../../constants/Authen_String'
import firebase_config from '../../config/firebase_config'
import SolidBgButton from '../../components/Button/SolidBgButton'
import Colors from '../../assets/colors/Color'
const Home = ({navigation, route}) => {

  useEffect(()=>{
    if(firebase_config){
      console.log("Connected")
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
     active={()=>{goToSignIn()}}
     backgroundSolidColor={Colors.PRIMARY}
     titleButton={Authen_String.SIGNIN}
     colorText={Colors.DARK}/>
    </SafeAreaView>
  )
}

export default Home