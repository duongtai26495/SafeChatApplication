import { View, Text, SafeAreaView, ToastAndroid, TextInput, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { onAuthStateChanged, getAuth, updatePassword, updateProfile } from 'firebase/auth'
import SolidBgButton from '../../components/Button/SolidBgButton'
import main_styles from '../../assets/styles/main_styles'
import profile_styles from './profile_styles'
import Profile_String from '../../constants/Profile_String'
import IMAGES from '../../constants/Image_Source_Url'
import Colors from '../../assets/colors/Color'
import Authen_String from '../../constants/Authen_String'
import NAVI_STRING from '../../constants/Navigate_String'
import { StackActions } from '@react-navigation/native'
import Icons_Source_Url from '../../constants/Icons_Source_Url'
const Profile = ({ navigation, route }) => {
  const auth = getAuth()

  const [displayName, setDisplayName] = useState("USER_DISPLAY_NAME")
  const [mailAddr, setMailAddr] = useState("USER_MAIL_ADDRESS")


  const [editNameState, setEditNameState] = useState(false)
  const [editImageState, setEditImageState] = useState(false)
  const [isLoading, setLoading] = useState(false)


  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const toggleChangeName = () => {
    setEditNameState(previousState => !previousState)
  }

  const updateYourName = Profile_String.NAMENOTUPDATE;

  useEffect(() => {
    checkUserLogin()
  }, [isLoading])

  const checkUserLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getProfileInfo()
      } else {
        navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
      }
    })
  }

  const signOut = () => {
    auth.signOut().then(() => {
      checkUserLogin()
    })
  }

  const changeDisplayName = () => {
    setLoading(true)
    const thisUser = auth.currentUser
    updateProfile(thisUser, {
      displayName: displayName
    }).then(() => {
      setLoading(false)
      setEditNameState(false)

    }).catch((err) => {
      setLoading(false)
      console.log("Failure: " + err)
    })
  }

  const getProfileInfo = () => {
    const thisUser = auth.currentUser
    if (thisUser !== null) {
      const displayFullName = thisUser.displayName
      const mailAddress = thisUser.email
      setDisplayName(displayFullName)
      setMailAddr(mailAddress)
    }
  }

  const goTochangePassword = () =>{
    navigation.navigate(NAVI_STRING.CHANGEPW)
  }


  const EditDisplayNameComponent = () => {
    if (editNameState) {
      return (
        <View style={profile_styles.editNameCard}>
          <TextInput
            style={profile_styles.fieldName}
            onChangeText={(value) => { setDisplayName(value) }}
            value={displayName}
            autoCapitalize='words'
            placeholder={"Enter your name"}
            placeholderTextColor={Colors.BLACK_TRANSP_5} />
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => changeDisplayName()}>
            <Image style={profile_styles.iconEditName} source={Icons_Source_Url.DONE} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={profile_styles.editNameCard}>
          <Text style={profile_styles.profileDisplayName}>{displayName !== null ? displayName : updateYourName}</Text>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { toggleChangeName() }}>
            <Image style={profile_styles.iconEditName} source={Icons_Source_Url.EDIT} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  const ChangePictureComponent = () =>{
    return(
      <TouchableOpacity style={profile_styles.layerChangeImage}>
        
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
      
      <ScrollView>
        <ActivityIndicator
          size={40}
          animationDuration={1500}
          color={Colors.SECONDARY}
          animating={isLoading ? true : false}
          style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
          hidesWhenStopped={true} />
{ChangePictureComponent()}

        <View style={profile_styles.boxProfileMain}>
          <View style={profile_styles.boxProfileImage}>
            <Image source={IMAGES.DEFAULT} style={profile_styles.myProfileImage} />
          </View>
          <View style={profile_styles.boxProfileInfo}>

            {EditDisplayNameComponent()}

            <Text style={profile_styles.profileMail}>{mailAddr}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => goTochangePassword()} style={profile_styles.profileFunctionBox}>
              <Image source={Icons_Source_Url.PW} style={profile_styles.iconFunction} />
              <Text style={profile_styles.textFunction}>{Profile_String.CHANGEPW}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profile_styles.profileFunctionBox}>
                <Image source={Icons_Source_Url.ABOUT} style={profile_styles.iconFunction} />
                <Text style={profile_styles.textFunction}>{Profile_String.ABOUT}</Text>
              </TouchableOpacity>
          </View>


          <SolidBgButton
            active={() => { signOut() }}
            backgroundSolidColor={Colors.PRIMARY}
            titleButton={Authen_String.SIGNOUT}
            colorText={Colors.DARK} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile