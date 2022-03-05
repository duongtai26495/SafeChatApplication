import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef, Component } from 'react'
import IMAGESOURCE from '../../constants/Image_Source_Url'
import main_styles from '../../assets/styles/main_styles'
import Authen_String from '../../constants/Authen_String'
import Colors from '../../assets/colors/Color'
import SolidBgButton from '../../components/Button/SolidBgButton'
import {getAuth} from 'firebase/auth'
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
    return (()=>{
      
    })
  }, [isError])

  const auth = getAuth()

  const [errorName, setErrorName] = useState(false)
  const [errorPhoneNum, setErrorPhoneNum] = useState(false)
  const [errorMaillAddr, setErrorMaillAddr] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorCpassword, setErrorCpassword] = useState(false)
  const [errPwNotMatch, setErrPwNotMatch] = useState(false)

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


  const submitSignUp = () => {
    if(!isError){
      console.log("VALIDATE OK")
    }else{
      console.log("VALIDATE NOT OK")
    }

  }

  return (
    <SafeAreaView>
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

          <SolidBgButton
            ref={goRef}
            marginV={15}
            active={() => { submitSignUp() }}
            backgroundSolidColor={Colors.PRIMARY}
            titleButton={Authen_String.GO.toUpperCase()}
            colorText={Colors.DARK} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup