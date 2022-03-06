import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef, Component } from 'react'
import IMAGESOURCE from '../../constants/Image_Source_Url'
import main_styles from '../../assets/styles/main_styles'
import Authen_String from '../../constants/Authen_String'
import Colors from '../../assets/colors/Color'
import NAVI_STRING from '../../constants/Navigate_String'
import { StackActions } from '@react-navigation/native'
import SolidBgButton from '../../components/Button/SolidBgButton'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, push, set } from "firebase/database";
const Signup = ({ navigation, route }) => {

  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mailAddress, setMailAddr] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")

  const [isError, setErrorState] = useState(false)
  const UnderlineColor = () => Colors.BLACK_TRANSP_8
  const PlaceholderColor = () => Colors.BLACK_TRANSP_6
  useEffect(() => {
    validateForm()
    return (() => {
    })
  }, [isError, fName, lName, phoneNumber, mailAddress, password, cPassword])

  const auth = getAuth()
  const [errorName, setErrorName] = useState(false)
  const [errorPhoneNum, setErrorPhoneNum] = useState(false)
  const [errorMaillAddr, setErrorMaillAddr] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorCpassword, setErrorCpassword] = useState(false)
  const [errPwNotMatch, setErrPwNotMatch] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const lNameRef = useRef()
  const phoneRef = useRef()
  const mailRef = useRef()
  const passwordRef = useRef()
  const cPasswordRef = useRef()
  const goRef = useRef()

  const validateForm = () => {
    if (fName === "" || lName === "") {
      setErrorState(true)
      setErrorName(true)
    } else {
      setErrorState(false)
      setErrorName(false)
    }

    if (phoneNumber === "") {
      setErrorState(true)
      setErrorPhoneNum(true)
    } else {
      setErrorState(false)
      setErrorPhoneNum(false)
    }

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

    if (cPassword === "") {
      setErrorState(true)
      setErrorCpassword(true)
    } else {
      setErrorState(false)
      setErrorCpassword(false)
    }

    if (password !== cPassword) {
      setErrorState(true)
      setErrPwNotMatch(true)
    } else {
      setErrorState(false)
      setErrPwNotMatch(false)
    }

  }

  const goToLogin = () => {
    navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
  }

  const submitSignUp = () => {
    validateForm()
    if (!isError) {
      createAccountByEmail()
    } else {
      console.log("VALIDATE NOT OK")
    }

  }

  const createAccountByEmail = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, mailAddress, password)
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
      await set(Ref, {
        "fName": fName,
        "lName": lName,
        "phoneNumber": phoneNumber,
        "maillAddress": mailAddress,
        "uid": UID,
        "isLogin": true,
      }).then(() => {
        console.log("Insert new user success! UserID: " + UID)
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
            {Authen_String.CREATEACCOUNT.toUpperCase()}
          </Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TextInput
              placeholder={Authen_String.FNAME}
              returnKeyType='next'
              autoCapitalize='words'
              onSubmitEditing={() => { lNameRef.current.focus() }}
              placeholderTextColor={PlaceholderColor()}
              style={main_styles.textFieldAuthen}
              underlineColorAndroid={UnderlineColor()}
              onChangeText={(value) => setFName(value)} />

            <TextInput
              ref={lNameRef}
              onSubmitEditing={() => { phoneRef.current.focus() }}
              placeholder={Authen_String.LNAME}
              returnKeyType='next'
              autoCapitalize='words'
              placeholderTextColor={PlaceholderColor()}
              style={main_styles.textFieldAuthen}
              underlineColorAndroid={UnderlineColor()}
              onChangeText={(value) => setLName(value)} />
          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            {errorName ?
              <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_NAME}</Text>
              : null}
          </View>


          <TextInput
            ref={phoneRef}
            onSubmitEditing={() => { mailRef.current.focus() }}
            placeholder={Authen_String.PHONENUM}
            returnKeyType='next'
            keyboardType='phone-pad'
            placeholderTextColor={PlaceholderColor()}
            style={main_styles.textFieldAuthen}
            underlineColorAndroid={UnderlineColor()}
            onChangeText={(value) => setPhoneNumber(value)} />
          {errorPhoneNum ?
            <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_PHONE}</Text>
            : null}
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
            onSubmitEditing={() => { cPasswordRef.current.focus() }}
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
          <TextInput
            ref={cPasswordRef}
            onSubmitEditing={() => goRef.current.focus}
            placeholder={Authen_String.CPASSWORD}
            returnKeyType='next'
            secureTextEntry={true}
            placeholderTextColor={PlaceholderColor()}
            style={main_styles.textFieldAuthen}
            underlineColorAndroid={UnderlineColor()}
            onChangeText={(value) => setCPassword(value)} />
          {errorCpassword ?
            <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_CPASSWORD}</Text>
            : null}
          {errPwNotMatch ?
            <Text style={main_styles.errorWar}>{Authen_String.MATCH_PW}</Text>
            : null}
          <TouchableOpacity
            ref={goRef}>
            <SolidBgButton
              ref={goRef}
              marginV={15}
              active={() => { submitSignUp() }}
              backgroundSolidColor={Colors.PRIMARY}
              titleButton={Authen_String.GO.toUpperCase()}
              colorText={Colors.DARK} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { goToLogin() }}>
            <Text style={main_styles.tvNavigation}>{Authen_String.HAVEANACCOUNT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup