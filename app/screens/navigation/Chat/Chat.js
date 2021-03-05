import { API, graphqlOperation, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

import { Asset } from 'expo-asset'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { getMessagesForChannel } from '../../../../graphql/Custom/messages.queries'
import { newMessage } from '../.././../../graphql/Custom/messages.subscriptions'

import { color } from '../../../styles/colors'
import { safeArea } from '../../../styles/containers'

import { SPACING_VIEW } from '../../../styles/variables'
import { Ionicons } from '@expo/vector-icons'
import useBehindKeyboard from '../../../context/InputBehindKeyboard'
import { createMessage } from '../../../../graphql/Custom/messages.mutations'

const logoPlaceholder = Asset.fromModule(
  require('../../../assets/profile_placeholder.png')
).uri

const avatarPlaceholder = Asset.fromModule(
  require('../../../assets/profile_placeholder.png')
).uri

const ChatScreen = ({ navigation, route }) => {
  const { keyboardPosition, handleInputBehindKeyboard } = useBehindKeyboard()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [scrollView, setScrollView] = useState()

  const { channelData } = route.params

  //console.log(channelData)

  const getMessages = async () => {
    try {
      const { data } = await API.graphql({
        query: getMessagesForChannel,
        variables: {
          id: channelData.id
        }
      })
      let messagesData = []
      for (let message of data.getChannel.messages.items) {
        const yourTeamInvestor = channelData.investor.yourself ? true : false
        const yourTeamStartup = channelData.startup.yourself ? true : false
        if (yourTeamInvestor) {
          let userAvatarURI
          if (message.sender.avatar?.key) {
            userAvatarURI = await Storage.get(message.sender.avatar.key)
          }
          const isYourTeam = message.channel.investor.members.items.some(
            ({ user }) => user.id === message.sender.id
          )
          const teamAvatar = isYourTeam
            ? await Storage.get(channelData.investor.logo.key)
            : await Storage.get(channelData.startup.logo.key)
          messagesData = [
            ...messagesData,
            {
              id: message.id,
              content: message.content,
              createdAt: message.createdAt,
              sender: {
                ...message.sender,
                avatarURI: userAvatarURI ? userAvatarURI : avatarPlaceholder
              },
              yourTeam: isYourTeam,
              teamAvatar: teamAvatar
            }
          ]
        } else if (yourTeamStartup) {
          let userAvatarURI
          if (message.sender.avatar?.key) {
            userAvatarURI = await Storage.get(message.sender.avatar.key)
          }
          const isYourTeam = message.channel.investor.members.items.some(
            ({ user }) => user.id === message.sender.id
          )
          const teamAvatar = isYourTeam
            ? await Storage.get(channelData.startup.logo.key)
            : await Storage.get(channelData.investor.logo.key)
          messagesData = [
            ...messagesData,
            {
              id: message.id,
              content: message.content,
              createdAt: message.createdAt,
              sender: {
                ...message.sender,
                avatarURI: userAvatarURI ? userAvatarURI : avatarPlaceholder
              },
              yourTeam: isYourTeam,
              teamAvatar: teamAvatar
            }
          ]
        }
      }
      setMessages(messagesData)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    await API.graphql({
      query: createMessage,
      variables: {
        input: {
          channelID: channelData.id,
          content: message
        }
      }
    })
    setMessage('')
  }

  useEffect(() => {
    navigation.setOptions({
      title: channelData.investor.yourself
        ? channelData.startup.name
        : channelData.investor.name
    })
    getMessages()
  }, [])

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(newMessage)).subscribe({
      next: async (data) => {
        const { value } = data
        const newMessage = value.data.newMessage

        if (newMessage.channel.id === channelData.id) {
          let messageData = []
          const yourTeamInvestor = channelData.investor.yourself ? true : false
          const yourTeamStartup = channelData.startup.yourself ? true : false
          if (yourTeamInvestor) {
            let userAvatarURI
            if (newMessage.sender.avatar?.key) {
              userAvatarURI = await Storage.get(newMessage.sender.avatar.key)
            }
            const isYourTeam = newMessage.channel.investor.members.items.some(
              ({ user }) => user.id === newMessage.sender.id
            )
            const teamAvatar = isYourTeam
              ? channelData.investor.logo.key
                ? await Storage.get(channelData.investor.logo.key)
                : logoPlaceholder
              : channelData.startup.logo.key
              ? await Storage.get(channelData.startup.logo.key)
              : logoPlaceholder
            messageData = [
              ...messageData,
              {
                id: newMessage.id,
                content: newMessage.content,
                createdAt: newMessage.createdAt,
                sender: {
                  ...newMessage.sender,
                  avatarURI: userAvatarURI ? userAvatarURI : avatarPlaceholder
                },
                yourTeam: isYourTeam,
                teamAvatar: teamAvatar
              }
            ]
          } else if (yourTeamStartup) {
            let userAvatarURI
            if (newMessage.sender.avatar?.key) {
              userAvatarURI = await Storage.get(newMessage.sender.avatar.key)
            }
            const isYourTeam = newMessage.channel.investor.members.items.some(
              ({ user }) => user.id === newMessage.sender.id
            )
            const teamAvatar = isYourTeam
              ? channelData.startup.logo.key
                ? await Storage.get(channelData.startup.logo.key)
                : logoPlaceholder
              : channelData.investor.logo.key
              ? await Storage.get(channelData.investor.logo.key)
              : logoPlaceholder
            messageData = [
              ...messageData,
              {
                id: newMessage.id,
                content: newMessage.content,
                createdAt: newMessage.createdAt,
                sender: {
                  ...newMessage.sender,
                  avatarURI: userAvatarURI ? userAvatarURI : avatarPlaceholder
                },
                yourTeam: isYourTeam,
                teamAvatar: teamAvatar
              }
            ]
          }
          setMessages([...messages, ...messageData])
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [messages])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const stackNavigator = navigation.dangerouslyGetParent()
      stackNavigator.setOptions({ tabBarVisible: false })
    })
    return unsubscribe
  }, [navigation])
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const stackNavigator = navigation.dangerouslyGetParent()
      stackNavigator.setOptions({ tabBarVisible: true })
    })
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <Animated.View
        style={[
          styles.container,
          Platform.OS !== 'web' && {
            transform: [{ translateY: keyboardPosition }]
          },
          {
            maxHeight: useDimensions().window.height - 64
          }
        ]}
        contentInset={{ bottom: 115 }}
      >
        <ScrollView
          style={styles.messagesContainer}
          ref={(ref) => {
            setScrollView(ref)
          }}
          onContentSizeChange={() => scrollView.scrollToEnd()}
        >
          {messages?.map((message) => (
            <View
              style={[
                styles.messageContainer,
                { justifyContent: message.yourTeam ? 'flex-end' : 'flex-start' }
              ]}
              key={message.id}
            >
              {message.yourTeam && (
                <View style={styles.messageTextContainer}>
                  <Text style={styles.message}>{message.content}</Text>
                  <Text style={styles.timestamp}>
                    {formatDistanceToNow(new Date(message.createdAt))} ago
                  </Text>
                </View>
              )}
              <Image
                style={[
                  styles.avatar,
                  !message.yourTeam
                    ? { marginRight: -25 }
                    : { marginLeft: -25, zIndex: 5 }
                ]}
                source={{
                  uri: message.yourTeam
                    ? message.sender.avatarURI
                    : message.teamAvatar
                }}
              />
              <Image
                style={[
                  styles.avatar,
                  !message.yourTeam
                    ? { marginRight: -25, zIndex: 5 }
                    : { marginLeft: -25 }
                ]}
                source={{
                  uri: message.yourTeam
                    ? message.teamAvatar
                    : message.sender.avatarURI
                }}
              />
              {!message.yourTeam && (
                <View style={styles.messageTextContainer}>
                  <Text style={styles.message}>{message.content}</Text>
                  <Text style={styles.timestamp}>
                    {formatDistanceToNow(new Date(message.createdAt))} ago
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.newMessageContainer}>
          <TextInput
            style={styles.newMessage}
            value={message}
            onChangeText={(value) => setMessage(value)}
            onFocus={(e) => {
              handleInputBehindKeyboard(e)
            }}
            placeholder="Type message here"
            placeholderTextColor={color.lightWhite}
            keyboardAppearance="dark"
          />
          <Pressable
            onPress={() => {
              sendMessage()
            }}
            style={styles.sendMessage}
          >
            <Ionicons name="ios-send" size={24} color={color.white} />
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesContainer: {
    flex: 1
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: SPACING_VIEW,
    alignItems: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  messageTextContainer: {
    marginHorizontal: 35,
    paddingVertical: 5,
    backgroundColor: color.secondary,
    borderRadius: 15
  },
  message: {
    marginHorizontal: 20,
    color: color.white,
    fontSize: 16
  },
  timestamp: {
    marginHorizontal: 20,
    color: color.lightWhite
  },
  newMessageContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    backgroundColor: color.background,
    paddingTop: 15,
    alignItems: 'center'
  },
  newMessage: {
    flex: 1,
    height: 50,
    paddingLeft: 15,
    marginBottom: 30,
    marginHorizontal: SPACING_VIEW,
    backgroundColor: color.secondary,
    borderRadius: 15,
    fontSize: 16,
    color: color.white
  },
  sendMessage: {
    marginBottom: 30,
    marginRight: SPACING_VIEW
  }
})

export default ChatScreen
