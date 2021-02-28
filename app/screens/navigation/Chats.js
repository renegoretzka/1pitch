import { API, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { useUser } from '../../context/User'
import { getMyChannels } from '../../../graphql/Custom/team.queries'

import { color } from '../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textHeader,
  textNormalBigger,
  userAvatar
} from '../../styles/containers'

import { AntDesign } from '@expo/vector-icons'
import { nanoid } from 'nanoid'

const ChatsScreen = ({ navigation }) => {
  const { user } = useUser()
  const [channel, setChannel] = useState([])

  const getChatData = async () => {
    try {
      const { data } = await API.graphql({
        query: getMyChannels
      })

      const teams = data.me.teams.items
      let channelData = []
      for (let { team } of teams) {
        if (team.startup) {
          const channels = team.startup.channels.items
          for (let channel of channels) {
            const investorLogoURI = await Storage.get(channel.investor.logo.key)
            const startupLogoURI = await Storage.get(channel.startup.logo.key)
            channelData = [
              ...channelData,
              {
                id: channel.id,
                investor: { ...channel.investor, logoURI: investorLogoURI },
                startup: {
                  ...channel.startup,
                  logoURI: startupLogoURI,
                  yourself: true
                },
                createdAt: channel.createdAt
              }
            ]
          }
        } else if (team.investor) {
          const channels = team.investor.channels.items
          for (let channel of channels) {
            const investorLogoURI = await Storage.get(channel.investor.logo.key)
            const startupLogoURI = await Storage.get(channel.startup.logo.key)
            channelData = [
              ...channelData,
              {
                id: channel.id,
                investor: {
                  ...channel.investor,
                  logoURI: investorLogoURI,
                  yourself: true
                },
                startup: { ...channel.startup, logoURI: startupLogoURI },
                createdAt: channel.createdAt
              }
            ]
          }
        }
      }
      setChannel(channelData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChatData()
  }, [user])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <ScrollView style={scrollContainer} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Text style={textHeader}>Your chats</Text>
        </View>
        <View style={styles.channelContainer}>
          {channel?.map((channelData) => (
            <Pressable
              onPress={() => {
                navigation.push('Chat', { channelData })
              }}
              style={styles.channel}
              key={nanoid()}
            >
              {channelData.investor.yourself && (
                <>
                  <Image
                    style={[userAvatar]}
                    source={{ uri: channelData.investor.logoURI }}
                  />
                  <Image
                    style={[userAvatar, { marginLeft: -65 }]}
                    source={{ uri: channelData.startup.logoURI }}
                  />
                  <View>
                    <Text style={textNormalBigger}>
                      {channelData.investor.name}
                    </Text>
                    <Text style={textNormalBigger}>
                      {channelData.startup.name}
                    </Text>
                  </View>
                  <AntDesign
                    style={{ marginLeft: 'auto' }}
                    name="rightcircleo"
                    size={28}
                    color={color.primary}
                  />
                </>
              )}
              {channelData.startup.yourself && (
                <>
                  <Image
                    style={[userAvatar]}
                    source={{ uri: channelData.startup.logoURI }}
                  />
                  <Image
                    style={[userAvatar, { marginLeft: -65 }]}
                    source={{ uri: channelData.investor.logoURI }}
                  />
                  <View>
                    <Text style={textNormalBigger}>
                      {channelData.startup.name}
                    </Text>
                    <Text style={textNormalBigger}>
                      {channelData.investor.name}
                    </Text>
                  </View>
                  <AntDesign
                    style={{ marginLeft: 'auto' }}
                    name="rightcircleo"
                    size={28}
                    color={color.primary}
                  />
                </>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  channelContainer: {
    marginTop: 15
  },
  channel: {
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: color.divider,
    alignItems: 'center'
  }
})

export default ChatsScreen
