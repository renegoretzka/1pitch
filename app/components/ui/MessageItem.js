import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { color } from '../../styles/colors'

import { SPACING_VIEW } from '../../styles/variables'

const MessageItem = ({ item }) => {
  const message = item
  //console.log(message)
  return (
    <View
      style={[
        styles.messageContainer,
        { justifyContent: message.yourTeam ? 'flex-end' : 'flex-start' }
      ]}
      key={message.id}
    >
      {message?.yourTeam && (
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
          uri: message.yourTeam ? message.sender?.avatarURI : message.teamAvatar
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
          uri: message.yourTeam ? message.teamAvatar : message.sender?.avatarURI
        }}
      />
      {!message?.yourTeam && (
        <View style={styles.messageTextContainer}>
          <Text style={styles.message}>{message.content}</Text>
          <Text style={styles.timestamp}>
            {
              /*formatDistanceToNow(new Date(message.createdAt))*/ message.createdAt
            }
            ago
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
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
  }
})

export default MessageItem
