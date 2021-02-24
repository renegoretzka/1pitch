import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../navigation/SignIn'
import Register from '../navigation/Profile/Register'

import { color } from '../../styles/colors'
import { FONT_WEIGHT_BOLD } from '../../styles/variables'

const Stack = createStackNavigator()

const SignInStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={headerOptions}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

const headerOptions = {
  headerStyle: {
    backgroundColor: color.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  headerTintColor: color.white,
  headerTitleStyle: {
    fontWeight: FONT_WEIGHT_BOLD
  },
  tabBarVisible: false
}

export default SignInStack
