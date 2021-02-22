import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../navigation/Home'

const Stack = createStackNavigator()

const HomeStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
