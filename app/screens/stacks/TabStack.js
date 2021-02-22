import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../navigation/Home'
import Chat from '../navigation/Chat'

import { useUser } from '../../context/User'

import { color } from '../../styles/colors'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import ProfileStack from './ProfileStack'

const Tab = createBottomTabNavigator()

const TabStack = ({ route }) => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <FontAwesome name="home" size={size} color={color} />
          } else if (route.name === 'Chat') {
            return <Ionicons name="md-chatboxes" size={size} color={color} />
          } else if (route.name === 'Chats') {
            return <Ionicons name="md-chatboxes" size={size} color={color} />
          } else if (route.name === 'Profile') {
            return <FontAwesome5 name="user-circle" size={size} color={color} />
          } else if (route.name === 'SignIn') {
            return <FontAwesome5 name="user-circle" size={size} color={color} />
          }
        }
      })}
      tabBarOptions={mainTabBarOptions}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chats" component={Chat} options={{ tabBarBadge: 3 }} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile'
        }}
      />
    </Tab.Navigator>
  )
}

const mainTabBarOptions = {
  activeTintColor: color.primary,
  inactiveTintColor: color.white,
  tabStyle: {
    marginTop: 15,
    zIndex: 1
  },
  labelStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.white
  },
  style: {
    backgroundColor: color.secondary,
    height: Platform.OS === 'ios' ? 105 : 65,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 0,
    position: 'absolute'
  }
}

export default TabStack
