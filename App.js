import 'react-native-gesture-handler'
import React from 'react'

import Amplify from 'aws-amplify'
import config from './aws-exports'
import { useKeepAwake } from 'expo-keep-awake'

import { UserProvider } from './app/context/User'
import { NotificationsProvider } from './app/context/Notifications'
import { ModalsProvider } from './app/context/Modals'

import RootStack from './app/screens/stacks/RootStack'

Amplify.configure({
  ...config,
  Auth: {
    mandatorySignIn: false
  },
  Analytics: {
    disabled: true
  }
})

const App = () => {
  useKeepAwake()

  return (
    <UserProvider>
      <NotificationsProvider>
        <ModalsProvider>
          <RootStack />
        </ModalsProvider>
      </NotificationsProvider>
    </UserProvider>
  )
}

export default App
