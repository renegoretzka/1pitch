import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../navigation/Profile'
import Register from '../navigation/Profile/Register'
import UpdateProfile from '../navigation/Profile/UpdateProfile'
import UpdateAvatar from '../navigation/Profile/UpdateAvatar'

import { color } from '../../styles/colors'
import { FONT_WEIGHT_BOLD } from '../../styles/variables'

const Stack = createStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={headerOptions}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: 'Change your profile'
        }}
      />
      <Stack.Screen
        name="UpdateAvatar"
        component={UpdateAvatar}
        options={{
          title: 'Take selfie or upload photo'
        }}
      />
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
    elevation: 6,
    borderBottomWidth: 0
  },
  headerTintColor: color.white,
  headerTitleStyle: {
    fontWeight: FONT_WEIGHT_BOLD
  },
  tabBarVisible: false
}

export default ProfileStack
