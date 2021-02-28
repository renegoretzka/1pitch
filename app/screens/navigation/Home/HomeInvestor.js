import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'

import { API } from 'aws-amplify'

import { getNextStartup } from '../../../../graphql/Custom/team.queries'

const HomeInvestor = ({ teamData }) => {
  const [startup, setStartup] = useState({})
  const [sound, setSound] = useState()

  const playRecord = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
    const { sound } = await Audio.Sound.createAsync({
      uri: recordURI
    })
    setSound(sound)
    await sound.playAsync()
  }

  const stopPlaying = async () => {
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
      setStartup(startup.data.getNextStartup)
      const pitchURI = await Storage.get(teamData.pitch.key)

      setRecordURI(pitchURI)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStartup()
  }, [])

  return (
    <View style={styles.container}>
      <Text>This is the home investor</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default HomeInvestor
