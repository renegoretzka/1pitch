import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInStack from './SignInStack'
import ProfileStack from './ProfileStack'
import TabStack from './TabStack'

import { useUser } from '../../context/User'

const Stack = createStackNavigator()

const RootStack = () => {
  const { user } = useUser()
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Signin">
        {user.id ? (
          <>
            <Stack.Screen name="Tabs" component={TabStack} />
            <Stack.Screen name="Profile" component={ProfileStack} />
          </>
        ) : (
          <Stack.Screen name="Signin" component={SignInStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
