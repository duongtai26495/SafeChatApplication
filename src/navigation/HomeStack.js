import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Home,
  Chat,
  InfoChat
} from '../screens'

const Stack = createNativeStackNavigator()


const HomeStack = () => {
  return (
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name='HomePage' component={Home} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='InfoChat' component={InfoChat} options={{ headerShown: false, animation: 'slide_from_left' }} />
      </Stack.Navigator>

  )
}

export default HomeStack