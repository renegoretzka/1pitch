import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'

import { API, Storage } from 'aws-amplify'
import * as mime from 'react-native-mime-types'
import config from '../../../../aws-exports'
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { useNotification } from '../../../context/Notifications'

import { updateStartup } from '../../../../graphql/mutations'

import SubmitButton from '../../../components/ui/SubmitButton'
import { color } from '../../../styles/colors'
import {
  textHeader,
  textInfo,
  textNormalBigger
} from '../../../styles/containers'

import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const HomeStartup = ({ teamData }) => {
  const { pushNotification } = useNotification()
  const [recording, setRecording] = useState()
  const [recordURI, setRecordURI] = useState()
  const [sound, setSound] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [reset, setReset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [lookingForFunding, setLookingForFunding] = useState(
    teamData.lookingForFunding
  )

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })
      setReset((prev) => prev + 1)
      setIsPlaying(true)
      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync({
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 96400,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false
        },
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000
        }
      })
      await recording.startAsync()
      setRecording(recording)
    } catch (err) {
      setIsPlaying(false)
      console.error('Failed to start recording', err)
    }
  }

  const stopRecording = async () => {
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true
    })
    setRecording(undefined)
    setIsPlaying(false)
    setRecordURI(uri)
  }

  const SuccessIcon = () => (
    <Ionicons name="ios-checkmark-circle-outline" size={30} color="white" />
  )

  const uploadPitch = async () => {
    try {
      setLoading(true)
      const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(recordURI)
      const mimeType = mime.lookup(recordURI)

      const key = `${teamData.id}/pitch${extension && '.'}${extension}`

      let file = {
        bucket,
        key,
        region
      }

      const image = await fetch(recordURI)
      const blob = await image.blob()

      await Storage.put(key, blob, {
        contentType: mimeType
      })

      let input = {
        id: teamData.id,
        pitch: file
      }
      if (lookingForFunding !== teamData.lookingForFunding) {
        input = {
          ...input,
          lookingForFunding
        }
      }
      await API.graphql({
        query: updateStartup,
        variables: {
          input
        }
      })
      pushNotification({
        text: 'Your pitch is successfully updated.',
        icon: SuccessIcon
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const getPitch = async () => {
    const pitchURI = await Storage.get(teamData.pitch.key)
    setRecordURI(pitchURI)
  }

  useEffect(() => {
    if (teamData.pitch?.key) {
      getPitch()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[textHeader, { marginBottom: 30, alignSelf: 'center' }]}>
        Record your pitch
      </Text>
      <View style={styles.recorder}>
        <CountdownCircleTimer
          onComplete={() => {
            stopRecording()
          }}
          key={reset}
          isPlaying={isPlaying}
          size={280}
          trailColor={color.secondary}
          duration={60}
          strokeWidth={20}
          colors={[
            [color.secondary, 0.33],
            [color.primary, 0.33],
            [color.primary]
          ]}
          children={({ remainingTime }) => {
            if (remainingTime === 0) {
              return <Text style={styles.recordCounterText}>Time is up</Text>
            }
            const seconds = remainingTime % 60 === 0 ? 60 : remainingTime % 60
            return (
              <>
                <Text style={styles.recordCounterSec}>{seconds}</Text>
                <Text style={styles.recordCounterText}>seconds left</Text>
              </>
            )
          }}
        />
      </View>
      <View style={styles.recordButtonContainer}>
        {!recording ? (
          <Pressable onPress={() => startRecording()}>
            <View style={styles.recordButton}>
              <Entypo
                name="controller-record"
                size={40}
                color={color.primary}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={() => stopRecording()}>
            <View style={styles.recordButton}>
              <Entypo name="controller-stop" size={40} color={color.primary} />
            </View>
          </Pressable>
        )}
      </View>
      {recordURI || teamData.pitch ? (
        <>
          <View style={styles.recording}>
            <Text style={styles.recordingText}>Your 1-minute pitch</Text>
            <Pressable onPress={() => playRecord()} style={styles.replay}>
              <Text style={styles.replayText}>Replay</Text>
              <View style={styles.replayButton}>
                <MaterialIcons name="replay" size={34} color={color.primary} />
              </View>
            </Pressable>
          </View>
          <Pressable
            style={styles.checkBoxButton}
            onPress={() => {
              setLookingForFunding(lookingForFunding === 'YES' ? 'NO' : 'YES')
            }}
          >
            <View style={styles.checkBox}>
              <View
                style={[
                  styles.checkBoxInner,
                  {
                    backgroundColor:
                      lookingForFunding === 'YES' ? color.primary : color.white
                  }
                ]}
              />
            </View>
            <View>
              <Text style={textNormalBigger}>Looking for funding</Text>
              <Text style={textInfo}>
                You have to enable this to be found by investors.
              </Text>
            </View>
          </Pressable>
          <SubmitButton
            onPress={uploadPitch}
            value={'Upload your pitch'}
            loading={loading}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100
  },
  recorder: {
    position: 'relative',
    alignItems: 'center'
  },
  innerCircleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordCounterSec: {
    color: color.white,
    fontSize: 54,
    fontWeight: '600'
  },
  recordCounterText: {
    color: color.white,
    fontSize: 20
  },
  recordButtonContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recording: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  recordingText: {
    fontSize: 24,
    color: color.white
  },
  replay: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  replayText: {
    fontSize: 18,
    color: color.white,
    marginRight: 10
  },
  replayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  checkBox: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxInner: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
})

export default HomeStartup
