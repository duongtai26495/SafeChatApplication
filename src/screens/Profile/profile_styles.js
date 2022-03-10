import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/Color'
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const widthComponent = width / 1.2
const profile_styles = StyleSheet.create({
    myProfileImage: {
        borderRadius: 100,
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    boxProfileMain:{
        width:widthComponent,
        alignSelf:'center',
        marginVertical: 20,
    },
    boxProfileImage: {
        width: 170,
        height: 170,
        borderRadius: 100,
        backgroundColor: Colors.PRIMARY,
        elevation: 3,
        shadowColor: Colors.DARK,
        justifyContent: 'center',
        alignSelf: 'center'

    },
    boxProfileInfo: {
        marginVertical: 20,
        alignItems:'center'
    },
    profileDisplayName: {
        color:Colors.DARK,
        fontWeight:'bold',
        fontSize:20,
    },
    profileMail: {
        color:Colors.DARK,
        fontSize:15,
    },
    profileFunctionBox:{
        width:widthComponent/2.05,
        height:widthComponent/2.05,
        elevation:3,
        borderRadius:10,
        marginVertical:10,
        shadowColor:Colors.DARK,
        backgroundColor:Colors.PRIMARY,
        justifyContent:'center'
    },
    editNameCard:{
        flexDirection:'row',
        alignSelf:'center',
        width:widthComponent,
        justifyContent:'center'
    },
    iconEditName:{
        width:25,
        height:25,
        marginStart:10,
    },
    fieldName:{
        color:Colors.DARK,
    },
    iconFunction:{
        width:'30%',
        height:'30%',
        alignSelf:'center',
    },
    textFunction:{
        alignSelf:'center',
        margin:5,
        color:Colors.WHITE,
        fontWeight:'bold',
        fontSize:16
    },
    formChangePw:{
        zIndex:99,
        height:height/4,
        width:widthComponent,
        backgroundColor:Colors.LIGHT,
        borderRadius:25,
        position:'absolute',
        bottom:0,
    },
    boxChangePw:{
        zIndex:98,
        width:'100%',
        height:'100%',
        bottom:0,
        position:'absolute',
        backgroundColor:Colors.DANGER
    },
    fieldChangePw:{
        flex:1,
        width:'100%',
        padding:5,
    },
    layerChangeImage:{
        flex:1,
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:99,
        bottom:0,
        backgroundColor:Colors.DANGER,
    }
})

export default profile_styles