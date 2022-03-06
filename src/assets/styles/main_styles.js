import {StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../colors/Color'
import Color from '../colors/Color'
const width = Dimensions.get('screen').width
const main_styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        
    },
    viewAuthen:{
        width:width/1.5,
        alignSelf:'center',
    },
    logoAuthen:{
        marginVertical:width/12,
        width:width/3,
        height:width/3,
        alignSelf:'center',
    },
    textWelcomeAuthen:{
        fontWeight:'bold',
        color:Colors.DARK,
        marginBottom:15,
        fontSize:30,
        alignSelf:'center',

    },
    textFieldAuthen:{
        paddingBottom:15,
        paddingHorizontal:10,
        fontSize:15,
        color:Colors.DARK,
        flex:1,

    },
    errorWar:{
        color:Colors.DANGER,
        fontSize:10,
        paddingStart:5,
        flex:1,
    },
    indicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
      },
      stopIndicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
      },
      tvNavigation:{
        color:Colors.DARK,
        alignSelf:'flex-end'
      }
})

export default main_styles