import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Audio } from 'expo-av'

import { API, Storage } from 'aws-amplify'

import { getNextStartup } from '../../../../graphql/Custom/team.queries'
import { textHeader, textNormal, userAvatar } from '../../../styles/containers'
import { color } from '../../../styles/colors'

import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { createBookmark, createChannel } from '../../../../graphql/mutations'

const HomeInvestor = ({ teamData }) => {
  const [startup, setStartup] = useState({})
  const [noStartups, setNoStartups] = useState(false)
  const [sound, setSound] = useState()
  const [status, setStatus] = useState()
  const [recordURI, setRecordURI] = useState()
  const [stage, setStage] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingFinished, setPlayingFinished] = useState(false)
  const playStatus = useRef(new Animated.Value(0)).current

  const playRecord = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
    const { sound, status } = await Audio.Sound.createAsync({
      uri: recordURI
    })
    setStatus(status)
    setSound(sound)
    setIsPlaying(true)
    setPlayingFinished(false)
    playStatus.setValue(0)
    Animated.timing(playStatus, {
      toValue: 300,
      duration: status.durationMillis,
      useNativeDriver: false
    }).start(() => {
      setIsPlaying(false)
      setPlayingFinished(true)
    })
    await sound.playAsync()
  }

  const stopPlaying = async () => {
    playStatus.stopAnimation()
    await sound.stopAsync()
  }

  const getStartup = async () => {
    try {
      const startup = await API.graphql({
        query: getNextStartup,
        variables: {
          input: {
            investorID: teamData.id
          }
        }
      })
      if (startup.data.getNextStartup) {
        let currentStage = startup.data.getNextStartup.stage

        setStage({
          text:
            currentStage === 'IDEA'
              ? 'Idea'
              : currentStage === 'BUSINESS_PLAN'
              ? 'Business plan'
              : currentStage === 'MVP'
              ? 'MVP built'
              : currentStage === 'PAYING_CUSTOMERS'
              ? 'Paying customers'
              : '',
          current:
            currentStage === 'IDEA'
              ? 1
              : currentStage === 'BUSINESS_PLAN'
              ? 2
              : currentStage === 'MVP'
              ? 3
              : currentStage === 'PAYING_CUSTOMERS'
              ? 4
              : '',
          left:
            currentStage === 'IDEA'
              ? 3
              : currentStage === 'BUSINESS_PLAN'
              ? 2
              : currentStage === 'MVP'
              ? 1
              : currentStage === 'PAYING_CUSTOMERS'
              ? 0
              : ''
        })

        const pitchURI = await Storage.get(
          startup.data.getNextStartup.pitch.key
        )
        const logoURI = await Storage.get(startup.data.getNextStartup.logo.key)
        setStartup({ ...startup.data.getNextStartup, logoURI })
        setRecordURI(pitchURI)
      } else {
        setNoStartups(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const discardStartup = async () => {
    await API.graphql({
      query: createBookmark,
      variables: {
        investorID: teamData.id,
        startupID: startup.id,
        type: 'HIDDEN'
      }
    })
    getStartup()
  }

  const matchStartup = async () => {
    await API.graphql({
      query: createBookmark,
      variables: {
        input: {
          investorID: teamData.id,
          startupID: startup.id,
          type: 'CONTACTED'
        }
      }
    })
    const channel = await API.graphql({
      query: createChannel,
      variables: {
        input: {
          investorID: teamData.id,
          startupID: startup.id
        }
      }
    })
    console.log(channel)
  }

  useEffect(() => {
    getStartup()
  }, [])

  return (
    <View style={styles.container}>
      {Object.keys(startup).length > 1 ? (
        <View style={{ flex: 1 }}>
          {startup.logoURI && (
            <Image
              style={[userAvatar, { alignSelf: 'center' }]}
              source={{ uri: startup?.logoURI }}
            />
          )}
          <Text style={styles.name}>{startup?.name}</Text>
          <View style={styles.stageContainer}>
            <View style={[styles.stageCurrent, { flex: stage?.current }]}>
              <Text style={styles.stageText}>{stage?.text}</Text>
            </View>
            <View style={[styles.stageFull, { flex: stage?.left }]} />
          </View>
          <View style={styles.tagContainer}>
            {startup.industries?.items?.map(({ industry }) => (
              <View style={styles.tag} key={industry.id}>
                <Text style={styles.tagText}>{industry.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.capitalContainer}>
            <View style={styles.capitalTextContainer}>
              <Text style={styles.capitalText}>Capital demand</Text>
            </View>
            <Text style={styles.capitalAmount}>
              {startup.capitalDemand?.toLocaleString()} USD
            </Text>
          </View>
          <Text style={[textNormal, { marginTop: 25, textAlign: 'center' }]}>
            {startup.summary}
          </Text>
          <View style={styles.pitchContainer}>
            <View style={styles.pitchPlayer}>
              <Animated.View
                style={[styles.pitchStatus, { width: playStatus }]}
              />
            </View>
            <Pressable
              onPress={() => {
                if (!isPlaying) {
                  playRecord()
                } else {
                  stopPlaying()
                }
              }}
              style={styles.pitchPlayButton}
            >
              {!isPlaying ? (
                !playingFinished ? (
                  <Ionicons name="ios-play" size={28} color={color.white} />
                ) : (
                  <MaterialIcons name="replay" size={34} color={color.white} />
                )
              ) : (
                <Entypo name="controller-stop" size={28} color={color.white} />
              )}
            </Pressable>
          </View>
          <View style={styles.matchOptionContainer}>
            <Pressable
              onPress={() => {
                discardStartup()
              }}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={72}
                color={color.white}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                matchStartup()
              }}
            >
              <Ionicons
                name="ios-checkmark-circle-outline"
                size={72}
                color={color.white}
              />
            </Pressable>
          </View>
        </View>
      ) : noStartups ? (
        <View>
          <Text style={textHeader}>
            There are no more startups. Please check again later.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={textNormal}>Loading...</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center'
  },
  name: {
    marginTop: 20,
    color: color.white,
    fontSize: 32,
    fontWeight: '500',
    alignSelf: 'center'
  },
  tagContainer: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center'
  },
  tag: {
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: color.secondary
  },
  tagText: {
    fontSize: 16,
    color: color.white
  },
  capitalContainer: {
    flexDirection: 'row',
    height: 30,
    borderRadius: 15,
    backgroundColor: color.secondary,
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'center'
  },
  capitalTextContainer: {
    backgroundColor: color.primary,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  capitalText: {
    color: color.white,
    fontSize: 16
  },
  capitalAmount: {
    paddingHorizontal: 20,
    color: color.white,
    fontSize: 16
  },
  stageContainer: {
    marginTop: 15,
    flexDirection: 'row',
    width: 250,
    height: 30,
    backgroundColor: color.secondary,
    borderRadius: 15,
    alignSelf: 'center'
  },
  stageCurrent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: color.primary,
    borderRadius: 15
  },
  stageText: {
    marginRight: 15,
    color: color.white,
    fontWeight: '500'
  },
  pitchContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  pitchPlayer: {
    height: 50,
    width: 300,
    borderRadius: 25,
    backgroundColor: color.secondary,
    overflow: 'hidden'
  },
  pitchStatus: {
    height: 50,
    backgroundColor: color.primary
  },
  pitchPlayButton: {
    marginTop: -40
  },
  matchOptionContainer: {
    flex: 1,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default HomeInvestor
