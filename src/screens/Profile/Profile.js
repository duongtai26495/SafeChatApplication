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
import ImagePicker from 'react-native-image-crop-picker'
import { StackActions } from '@react-navigation/native'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icons_Source_Url from '../../constants/Icons_Source_Url'
const Profile = ({ navigation, route }) => {

  
  useEffect(() => {
    checkUserLogin()
    return (()=>{
      setFileImage(null)
    })
  }, [isLoading, isSavePhoto])

  
  const auth = getAuth()

  const [displayName, setDisplayName] = useState("USER_DISPLAY_NAME")
  const [mailAddr, setMailAddr] = useState("USER_MAIL_ADDRESS")

  const [selectImageUrl, setSelectImageUrl] = useState()
  const [fileImage, setFileImage] = useState()
  const [userID, setUserID] = useState()  
  const [photoUrl, setPhotoUrl ] = useState()

  const [editNameState, setEditNameState] = useState(false)
  const [editImageState, setEditImageState] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isSavePhoto, setSavePhoto] = useState(false)

  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const toggleChangeName = () => {
    setEditNameState(previousState => !previousState)
  }

  const toggleChangePicture = () => {
    setEditImageState(previousState => !previousState)
  }

  const checkUserLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getProfileInfo()
      } else {
        setLoading(false)
        navigation.dispatch(StackActions.replace(NAVI_STRING.SIGNIN))
      }
    })
  }

  const signOut = () => {
    setLoading(true)
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
      const userid = thisUser.uid
      const photoUrl = thisUser.photoURL
      setDisplayName(displayFullName)
      setMailAddr(mailAddress)
      setUserID(userid)
      setPhotoUrl(photoUrl)
      setLoading(false)
    }
  }

  const goTochangePassword = () => {
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
          <Text style={profile_styles.profileDisplayName}>{displayName !== null ? displayName.toUpperCase() : Profile_String.NAMENOTUPDATE}</Text>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { toggleChangeName() }}>
            <Image style={profile_styles.iconEditName} source={Icons_Source_Url.EDIT} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  const PreviewSelectImageComponent = () => {
    if (selectImageUrl != null) {
      return (
        <View>
          <Image source={{ uri: selectImageUrl }} style={profile_styles.imageSelected} />

          <TouchableOpacity onPress={() => { uploadNewPhoto() }} style={{...profile_styles.buttonChoosePhoto,backgroundColor:Colors.SECONDARY}}>
            <Text style={{...profile_styles.titleButtonChoosePhoto,color:Colors.LIGHT}}>{Profile_String.UPLOADTHISPHOTO}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const CancelSelectImage = () => {
    setEditImageState(false)
    setSelectImageUrl(null)
  }

  const ChangePictureComponent = () => {
    if (editImageState) {
      return (
        <View style={profile_styles.layerChangeImage}>
          <ActivityIndicator
            size={40}
            animationDuration={1500}
            color={Colors.PRIMARY}
            animating={isSavePhoto ? true : false}
            style={isSavePhoto ? main_styles.indicator : main_styles.stopIndicator}
            hidesWhenStopped={true} />

          <TouchableOpacity activeOpacity={1} onPress={() => toggleChangePicture()} style={profile_styles.boxChangeImage}>

            {PreviewSelectImageComponent()}
            <Text style={profile_styles.titleUploadPhoto}>{Profile_String.UPLOADPHOTO}</Text>
            <Text style={profile_styles.titleChoosePhoto}>{Profile_String.CHOOSE_NEW_PICTURE}</Text>

            <TouchableOpacity onPress={() => { takePictureFromCamera() }} style={profile_styles.buttonChoosePhoto}>
              <Text style={profile_styles.titleButtonChoosePhoto}>{Profile_String.TAKE_PHOTO}</Text>
              <Image source={Icons_Source_Url.CAMERA} style={profile_styles.iconChangePicture} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { selectFromGallery() }} style={profile_styles.buttonChoosePhoto}>
              <Text style={profile_styles.titleButtonChoosePhoto}>{Profile_String.FROM_LIBRARY}</Text>
              <Image source={Icons_Source_Url.GALLERY} style={profile_styles.iconChangePicture} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { CancelSelectImage() }} style={profile_styles.buttonChoosePhoto}>
              <Text style={profile_styles.titleButtonChoosePhoto}>{Profile_String.CANCEL}</Text>
              <Image source={Icons_Source_Url.CANCEL} style={profile_styles.iconChangePicture} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )
    }
  }

  async function selectFromGallery() {
    setSelectImageUrl(null)
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      includeExif: true,

    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setSelectImageUrl(imagePath)
      setFileImage(image)
    }).catch((err) => {
      console.log("Cancel select! " + err)
    });
  }

  async function takePictureFromCamera() {
    setSelectImageUrl(null)
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      includeExif: true,

    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setSelectImageUrl(imagePath)
      setFileImage(image)
    }).catch((err) => {
      console.log("Cancel select! " + err)
    });
  }

  const uploadNewPhotoToStorage = async file => {
    const uri = file.path

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), "ProfileImage/" + userID + "/" + userID + "_photoUrl");
    const result = await uploadBytes(fileRef, blob);


    blob.close();

    if (result !== null) {

      console.log("Upload success!")
      getDownloadURL(fileRef).then((url) => {
        const currentUser = getAuth().currentUser
        updateProfile(currentUser, {
          photoURL: url
        }).then(() => {
          setEditImageState(false)
          setSavePhoto(false)
        })
      }).catch((err) => {
        console.log("Get link image failure! " + err)
      })
    }
  }

  const uploadNewPhoto = () => {
    setSavePhoto(true)
    if (selectImageUrl !== null && fileImage !== null) {
      setSelectImageUrl(selectImageUrl)
      uploadNewPhotoToStorage(fileImage)
    }
  }

  return (
    <SafeAreaView style={profile_styles.container}>

      <ScrollView>
        <ActivityIndicator
          size={40}
          animationDuration={1500}
          color={Colors.SECONDARY}
          animating={isLoading ? true : false}
          style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
          hidesWhenStopped={true} />

        <View style={profile_styles.boxProfileMain}>
          <View style={profile_styles.boxProfileImage}>
            <Image source={ photoUrl !== null ? {uri : photoUrl } : IMAGES.DEFAULT} style={profile_styles.myProfileImage} />
          </View>
          <View style={profile_styles.boxProfileInfo}>

            {EditDisplayNameComponent()}

            <Text style={profile_styles.profileMail}>{mailAddr}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => toggleChangePicture()} style={profile_styles.profileFunctionBox}>
              <Image source={Icons_Source_Url.CHANGEIMAGE} style={profile_styles.iconFunction} />
              <Text style={profile_styles.textFunction}>{Profile_String.CHANGEAVT}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goTochangePassword()} style={profile_styles.profileFunctionBox}>
              <Image source={Icons_Source_Url.PW} style={profile_styles.iconFunction} />
              <Text style={profile_styles.textFunction}>{Profile_String.CHANGEPW}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={profile_styles.profileFunctionBox}>
              <Image source={Icons_Source_Url.ABOUT} style={profile_styles.iconFunction} />
              <Text style={profile_styles.textFunction}>{Profile_String.ABOUT}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => signOut()} style={profile_styles.profileFunctionBox}>
              <Image source={Icons_Source_Url.SIGNOUT} style={profile_styles.iconFunction} />
              <Text style={profile_styles.textFunction}>{Authen_String.SIGNOUT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {ChangePictureComponent()}
    </SafeAreaView>
  )
}

export default Profile