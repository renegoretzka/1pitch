import { API, graphqlOperation, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  FlatList,
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

import { getMessagesForChannel } from '../../../../graphql/Custom/messages.queries'
import { newMessage } from '../.././../../graphql/Custom/messages.subscriptions'

import { color } from '../../../styles/colors'
import { safeArea } from '../../../styles/containers'

import { SPACING_VIEW } from '../../../styles/variables'
import { Ionicons } from '@expo/vector-icons'
import useBehindKeyboard from '../../../context/InputBehindKeyboard'
import { createMessage } from '../../../../graphql/Custom/messages.mutations'
import MessageItem from '../../../components/ui/MessageItem'

const logoPlaceholder = Asset.fromModule(
  require('../../../assets/profile_placeholder.png')
).uri

const avatarPlaceholder = Asset.fromModule(
  require('../../../assets/profile_placeholder.png')
).uri

const ChatScreen = ({ navigation, route }) => {
  const { keyboardPosition, handleInputBehindKeyboard } = useBehindKeyboard()
  const [messages, setMessages] = useState([])
  const [messagesToken, setMessagesToken] = useState([])
  const [message, setMessage] = useState('')
  const [scrollView, setScrollView] = useState()
  const [fetching, setFetching] = useState(false)

  const { channelData } = route.params

  const getMessages = async (nextToken) => {
    try {
      setFetching(true)
      const { data } = await API.graphql({
        query: getMessagesForChannel,
        variables: {
          id: channelData.id,
          nextToken: nextToken ? nextToken : null
        }
      })
      setMessagesToken(data.getChannel.messages.nextToken)
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
      setFetching(false)
      setMessages(
        nextToken
          ? [...messagesData.reverse(), ...messages]
          : messagesData.reverse()
      )
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
    if (scrollView) {
      scrollView.scrollToEnd()
    }
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
        <View style={styles.messagesContainer}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageItem item={item} />}
            keyExtractor={(item) => item.id}
            ref={(ref) => {
              setScrollView(ref)
            }}
            onRefresh={() => {
              if (messagesToken) {
                getMessages(messagesToken)
              }
            }}
            refreshing={fetching}
            style={styles.flatlist}
          />
        </View>
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
  flatlist: {
    flex: 1
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
