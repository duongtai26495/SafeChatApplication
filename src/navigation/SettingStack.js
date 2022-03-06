import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Setting,
} from '../screens'


const Stack = createNativeStackNavigator()

const SettingStack = () => {
  return (
      <Stack.Navigator initialRouteName='SettingPage'>
        <Stack.Screen name='SettingePage' component={Setting} options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack.Navigator>
  )
}

export default SettingStack