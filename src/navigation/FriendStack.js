import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Friends,
  FriendInfo
} from '../screens'


const Stack = createNativeStackNavigator()


const FriendStack = () => {
  return (
      <Stack.Navigator initialRouteName='FriendsPage'>
        <Stack.Screen name='FriendsPage' component={Friends} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='FriendInfo' component={FriendInfo} options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack.Navigator>

  )
}

export default FriendStack