import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { color } from '../../styles/colors'
import { FONT_WEIGHT_BOLD } from '../../styles/variables'

import ChatsScreen from '../navigation/Chats'
import ChatScreen from '../navigation/Chat/Chat'

const Stack = createStackNavigator()

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Chats" screenOptions={headerOptions}>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Your chat'
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
    elevation: 6
  },
  headerTintColor: color.white,
  headerTitleStyle: {
    fontWeight: FONT_WEIGHT_BOLD
  },
  tabBarVisible: false
}

export default ChatStack
