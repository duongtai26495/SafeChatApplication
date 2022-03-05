import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  Home,
  Signin,
  Signup
} from '../screens'


const Stack = createNativeStackNavigator()


const authen_navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signup'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false, animation: 'slide_from_left' }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default authen_navigation