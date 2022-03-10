import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Profile,
  Signin,
  Signup,
  ChangePw
} from '../screens'


const Stack = createNativeStackNavigator()


const ProfileStack = () => {
  return (
      <Stack.Navigator initialRouteName='ProfilePage'>
        <Stack.Screen name='ProfilePage' component={Profile} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='ChangePw' component={ChangePw} options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack.Navigator>

  )
}

export default ProfileStack