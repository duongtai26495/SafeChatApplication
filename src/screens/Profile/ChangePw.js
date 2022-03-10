import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IMAGESOURCE from '../../constants/Image_Source_Url'
import main_styles from '../../assets/styles/main_styles'
import Authen_String from '../../constants/Authen_String'
import Colors from '../../assets/colors/Color'
import NAVI_STRING from '../../constants/Navigate_String'
import { StackActions } from '@react-navigation/native'
import SolidBgButton from '../../components/Button/SolidBgButton'
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, update } from "firebase/database";
import Profile_String from '../../constants/Profile_String'
const ChangePw = ({ navigation, route }) => {

    const [cPassword, setCPassword] = useState("")
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")

    const [isRelogin, setReloginState] = useState(false)
    const [errPwNotMatch, setErrPwNotMatch] = useState(false)
    const [isError, setErrorState] = useState(false)

    const UnderlineColor = () => Colors.BLACK_TRANSP_8
    const PlaceholderColor = () => Colors.BLACK_TRANSP_6

    useEffect(() => {
        validateForm()
        return (() => {
        })
    }, [isError, cPassword, password])


    const [errorCPassword, setErrorCPassword] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)


    const cPasswordRef = useRef()
    const goRef = useRef()

    
  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

    const changePassword = () => {
        setLoading(true)
        const auth = getAuth()
        const thisUser = auth.currentUser
        const newPw = password
        updatePassword(thisUser, newPw)
            .then(() => {
                showToast(Profile_String.CHANGEPWSS)
                setLoading(false)
                navigation.dispatch(StackActions.replace(NAVI_STRING.PROFILEPAGE))
            }).catch((err) => {
                console.log("Error: " + err)
                setLoading(false)
            })
    }

    const reSignIn = () =>{
        setLoading(true)
        const auth = getAuth()
        const thisUSer = auth.currentUser
        const mailAddress = thisUSer.email
        signInWithEmailAndPassword(auth, mailAddress, oldPassword)
        .then(()=>{
            console.log("Re-Signin success!")
            setReloginState(true)
            setLoading(false)
        }).catch((err)=>{
            console.log("Re-Signin failure!")
        })
    }

    const validateForm = () => {

        if (cPassword === "") {
            setErrorState(true)
            setErrorCPassword(true)
        } else {
            setErrorState(false)
            setErrorCPassword(false)
        }

        if (password === "") {
            setErrorState(true)
            setErrorPassword(true)
        } else {
            setErrorState(false)
            setErrorPassword(false)
        }

        if (password !== cPassword) {
            setErrorState(true)
            setErrPwNotMatch(true)
        } else {
            setErrorState(false)
            setErrPwNotMatch(false)
        }
    }

    const FormChangePWComponent = () => {
        if (isRelogin) {
            return (
                <View>
                <Text style={main_styles.textWelcomeAuthen}>
                       {Profile_String.CHANGEPWTITLE.toUpperCase()}
                   </Text>
                   <TextInput
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
                       onSubmitEditing={() => { goRef.current.focus() }}
                       placeholder={Authen_String.CPASSWORD}
                       returnKeyType='next'
                       secureTextEntry={true}
                       placeholderTextColor={PlaceholderColor()}
                       style={main_styles.textFieldAuthen}
                       underlineColorAndroid={UnderlineColor()}
                       onChangeText={(value) => setCPassword(value)} />
                   {errorCPassword ?
                       <Text style={main_styles.errorWar}>{Authen_String.REQUIRED_CPASSWORD}</Text>
                       : null}
                   {errPwNotMatch ?
                       <Text style={main_styles.errorWar}>{Authen_String.MATCH_PW}</Text>
                       : null}
                   <TouchableOpacity
                       ref={goRef}>
                       <SolidBgButton
                           marginV={15}
                           active={() => { changePassword() }}
                           backgroundSolidColor={Colors.PRIMARY}
                           titleButton={Authen_String.GO.toUpperCase()}
                           colorText={Colors.DARK} />
                   </TouchableOpacity>
                   </View>
            )
           
        }else{
            return (
                <View>
                <Text style={main_styles.textWelcomeAuthen}>
                       {Profile_String.CONFIRMOLDPW.toUpperCase()}
                   </Text>
                  
                   <TextInput
                       onSubmitEditing={() => { goRef.current.focus() }}
                       placeholder={Profile_String.OLDPW}
                       returnKeyType='next'
                       secureTextEntry={true}
                       placeholderTextColor={PlaceholderColor()}
                       style={main_styles.textFieldAuthen}
                       underlineColorAndroid={UnderlineColor()}
                       onChangeText={(value) => setOldPassword(value)} />
                   {errorCPassword ?
                       <Text style={main_styles.errorWar}>{Profile_String.REQUIRED_PASSWORD}</Text>
                       : null}

                   <TouchableOpacity
                       ref={goRef}>
                       <SolidBgButton
                           marginV={15}
                           active={() => { reSignIn() }}
                           backgroundSolidColor={Colors.PRIMARY}
                           titleButton={Authen_String.GO.toUpperCase()}
                           colorText={Colors.DARK} />
                   </TouchableOpacity>
                   </View>
            )
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
                   
                   
                   {FormChangePWComponent()}
                    
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ChangePw