import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IMAGESOURCE from '../../constants/Image_Source_Url'
import main_styles from '../../assets/styles/main_styles'
import Authen_String from '../../constants/Authen_String'
import Colors from '../../assets/colors/Color'
import NAVI_STRING from '../../constants/Navigate_String'
import { StackActions } from '@react-navigation/native'
import SolidBgButton from '../../components/Button/SolidBgButton'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, update } from "firebase/database";
const Signin = ({ navigation, route }) => {

  const [mailAddress, setMailAddr] = useState("")
  const [password, setPassword] = useState("")

  const [isError, setErrorState] = useState(false)
  const UnderlineColor = () => Colors.BLACK_TRANSP_8
  const PlaceholderColor = () => Colors.BLACK_TRANSP_6

  useEffect(() => {
    validateForm()
    return (() => {
    })
  }, [isError, mailAddress, password])

  const auth = getAuth()
  const [errorMaillAddr, setErrorMaillAddr] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)


  const mailRef = useRef()
  const passwordRef = useRef()
  const goRef = useRef()

  const validateForm = () => {

    if (mailAddress === "") {
      setErrorState(true)
      setErrorMaillAddr(true)
    } else {
      setErrorState(false)
      setErrorMaillAddr(false)
    }

    if (password === "") {
      setErrorState(true)
      setErrorPassword(true)
    } else {
      setErrorState(false)
      setErrorPassword(false)
    }
  }

  const goToSignUp = () => {
    navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNUP))
  }

  const submitSignIn = () => {
    validateForm()
    if (!isError) {
      signInAccountByEmail()
    } else {
      console.log("VALIDATE NOT OK")
    }

  }

  const signInAccountByEmail = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, mailAddress, password)
      .then(() => {
        updateInfoUser()
      }).catch((err) => {
        console.log("An error create: " + err)
        setLoading(false)
      });
  }

  const updateInfoUser = async () => {
    const auth = getAuth()
    const thisUser = auth.currentUser
    const UID = thisUser.uid
    const db = getDatabase()
    if (UID !== null) {
      const Ref = ref(db, "Users/Info/" + UID + "/")
      await update(Ref, {
        "isLogin": true
      }).then(() => {
        console.log("Update info user success! UserID: " + UID)
        navigation.dispatch(StackActions.replace(NAVI_STRING.PROFILEPAGE))
        setLoading(false)
      }).catch((err) => {
        console.log("An error: " + err)
        setLoading(false)
      });
    }
  }
  return (
    <SafeAreaView>
      <ActivityIndicator
        size={40}
        animationDuration={1500}
        color={Colors.SECONDARY}
        animating={isLoading ? true : false}
        style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
        hidesWhenStopped={true} />

      <ScrollView>
        <View style={main_styles.viewAuthen}>
          <Image source={IMAGESOURCE.LOGO_CYCLER} style={main_styles.logoAuthen} />
          <Text style={main_styles.textWelcomeAuthen}>
            {Authen_String.WELCOMEBACK.toUpperCase()}
          </Text>

          <TextInput
            ref={mailRef}
            onSubmitEditing={() => { passwordRef.current.focus() }}
            placeholder={Authen_String.MAILADD}
            returnKeyType='next'
            keyboardType='email-address'
            autoCapitalize='none'
            placeholderTextColor={PlaceholderColor()}
            style={main_styles.textFieldAuthen}
            underlineColorAndroid={UnderlineColor()}
            onChangeText={(value) => setMailAddr(value)} />
          {errorMaillAddr ?
            <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_MAILADDR}</Text>
            : null}
          <TextInput
            ref={passwordRef}
            onSubmitEditing={() => { goRef.current.focus() }}
            placeholder={Authen_String.PASSWORD}
            returnKeyType='next'
            secureTextEntry={true}
            placeholderTextColor={PlaceholderColor()}
            style={main_styles.textFieldAuthen}
            underlineColorAndroid={UnderlineColor()}
            onChangeText={(value) => setPassword(value)} />
          {errorPassword ?
            <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_PASSWORD}</Text>
            : null}
          <TouchableOpacity
          ref={goRef}>
          <SolidBgButton
            marginV={15}
            active={() => { submitSignIn() }}
            backgroundSolidColor={Colors.PRIMARY}
            titleButton={Authen_String.GO.toUpperCase()}
            colorText={Colors.DARK} />

          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => { goToSignUp() }}>
            <Text style={main_styles.tvNavigation}>{Authen_String.NOACCOUNT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin