import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/Color'
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const widthComponent = width / 1.2
const profile_styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    myProfileImage: {
        borderRadius: 100,
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    boxProfileMain: {
        width: widthComponent,
        alignSelf: 'center',
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
        alignItems: 'center'
    },
    profileDisplayName: {
        color: Colors.DARK,
        fontWeight: 'bold',
        fontSize: 20,
    },
    profileMail: {
        color: Colors.DARK,
        fontSize: 15,
    },
    profileFunctionBox: {
        width: widthComponent / 2.05,
        height: widthComponent / 2.05,
        elevation: 3,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: Colors.DARK,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center'
    },
    editNameCard: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: widthComponent,
        justifyContent: 'center'
    },
    iconEditName: {
        width: 25,
        height: 25,
        marginStart: 10,
    },
    fieldName: {
        color: Colors.DARK,
    },
    iconFunction: {
        width: '30%',
        height: '30%',
        alignSelf: 'center',
    },
    textFunction: {
        alignSelf: 'center',
        margin: 5,
        color: Colors.WHITE,
        fontWeight: 'bold',
        fontSize: 16
    },
    formChangePw: {
        zIndex: 99,
        height: height / 4,
        width: widthComponent,
        backgroundColor: Colors.LIGHT,
        borderRadius: 25,
        position: 'absolute',
        bottom: 0,
    },
    boxChangePw: {
        zIndex: 98,
        width: '100%',
        height: '100%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: Colors.DANGER
    },
    fieldChangePw: {
        flex: 1,
        width: '100%',
        padding: 5,
    },
    layerChangeImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 98,
        bottom: 0,
        backgroundColor: Colors.BLACK_TRANSP_5,
    },
    imageSelected: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: 10
    },
    titleUploadPhoto: {
        color: Colors.DARK,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',

    },
    titleChoosePhoto: {
        color: Colors.DARK,
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 10,
    },
    boxChangeImage: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 25,
        backgroundColor: Colors.LIGHT,
        zIndex: 99,
        padding: 20,
    },
    buttonChoosePhoto: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        padding:10,
        marginVertical: 5,
        flexDirection:'row',
        justifyContent:'center'
    },
    titleButtonChoosePhoto: {
        color: Colors.DARK,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    iconChangePicture:{
        width:20,
        height:20,
        marginStart:10,
    },
    boxDetailProfile:{
        marginBottom:10,
        width:widthComponent,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:Colors.WHITE,
        borderColor:Colors.PRIMARY,
        elevation:3,
        shadowColor:Colors.DARK,
        padding:15,
        justifyContent:'center',
        alignItems:'center'
    },
    textDetail:{
        color:Colors.BLACK_TRANSP_6,
        fontSize:15,
    },
    inputDetail:{
        flex:1,
        color:Colors.DARK,
        alignContent:'flex-start',
        backgroundColor:Colors.BLACK_TRANSP_2,
        padding:10,
        borderRadius:5,
    }

})

export default profile_styles