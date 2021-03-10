import React, { useState, useEffect, useRef } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Animated
} from 'react-native'
import * as mime from 'react-native-mime-types'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

import { API, Storage } from 'aws-amplify'
import {
  createIndustryInvestorLink,
  createInvestor,
  updateInvestor
} from '../../../../../graphql/mutations'
import config from '../../../../../aws-exports'
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

import useBehindKeyboard from '../../../../context/InputBehindKeyboard'

import { color } from '../../../../styles/colors'
import {
  safeArea,
  textInput,
  textNormalBigger
} from '../../../../styles/containers'
import {
  SPACING_BETWEEN_SMALL,
  SPACING_VIEW
} from '../../../../styles/variables'

import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const InvestorInformation = ({ navigation, route }) => {
  const [teamInfo, setTeamInfo] = useState(route.params?.teamInfo)
  const { handleInputBehindKeyboard } = useBehindKeyboard()

  const pickImage = async () => {
    try {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      })
      image = await ImageManipulator.manipulateAsync(image.uri, [
        { resize: { width: 500 } }
      ])

      if (!image.cancelled) {
        setTeamInfo({ ...teamInfo, logo: image.uri })
      }
    } catch (error) {
      console.log('Error from pickImage', error)
    }
  }

  const [loading, setLoading] = useState(false)
  const [loadingStyle, setLoadingStyle] = useState({})
  const loadingSpinner = useRef(new Animated.Value(0)).current

  const spin = loadingSpinner.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const createTeam = async (team) => {
    try {
      setLoading(true)
      let input = {
        name: team.name,
        summary: team.summary,
        stages: team.stages,
        capitalInvestMin: team.capitalInvestMin,
        capitalInvestMax: team.capitalInvestMax
      }

      const investor = await API.graphql({
        query: createInvestor,
        variables: {
          input
        }
      })
      input = {
        id: investor.data.createInvestor.id
      }

      if (team.logo) {
        const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(team.logo)
        const mimeType = mime.lookup(team.logo)

        const key = `${input.id}/logo${extension && '.'}${extension}`

        let file = {
          bucket,
          key,
          region
        }

        const image = await fetch(team.logo)
        const blob = await image.blob()

        await Storage.put(key, blob, {
          contentType: mimeType
        })

        input = {
          ...input,
          logo: file
        }

        await API.graphql({
          query: updateInvestor,
          variables: {
            input
          }
        })
      }
      if (team.industries) {
        input = {
          investorID: input.id
        }
        for (let industryID of team.industries) {
          await API.graphql({
            query: createIndustryInvestorLink,
            variables: {
              input: { ...input, industryID }
            }
          })
        }
      }
      setLoading(false)
      const stackNavigator = navigation.dangerouslyGetParent()
      stackNavigator.setOptions({ tabBarVisible: false })
      navigation.navigate('Teams')
    } catch (error) {
      setLoading(false)
      console.log('Error from createTeam', error)
    }
  }

  useEffect(() => {
    if (loading) {
      setLoadingStyle({
        backgroundColor: color.primaryOpacity
      })
      Animated.loop(
        Animated.spring(loadingSpinner, {
          toValue: 1,
          tension: 2,
          friction: 10,
          useNativeDriver: false
        })
      ).start()
    } else {
      setLoadingStyle({
        backgroundColor: color.primary
      })
      Animated.timing(loadingSpinner).stop()
    }
  }, [loading])

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
    <>
      <SafeAreaView style={safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionProgress}>Questionnaire 6 of 6</Text>
            <Text style={styles.question}>
              Additional information about your investments and company
            </Text>
            <View style={styles.logoContainer}>
              {teamInfo.logo ? (
                <Pressable onPress={() => pickImage()} style={styles.row}>
                  <Image style={styles.logo} source={{ uri: teamInfo.logo }} />
                </Pressable>
              ) : (
                <Pressable onPress={() => pickImage()} style={styles.row}>
                  <Feather
                    name="upload"
                    style={{ fontSize: 28, marginRight: SPACING_BETWEEN_SMALL }}
                    color="white"
                  />
                  <Text style={textNormalBigger}>Pick your logo</Text>
                </Pressable>
              )}
            </View>
            <Text
              style={[textNormalBigger, { fontSize: 20, marginBottom: 10 }]}
            >
              Summary
            </Text>
            <TextInput
              value={teamInfo.summary}
              onChangeText={(value) =>
                setTeamInfo({ ...teamInfo, summary: value })
              }
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Describe your company here"
              keyboardAppearance="dark"
              multiline={true}
              style={[textInput, styles.input]}
            />
          </View>

          <View style={styles.buttonsContinueBack}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.buttonBack}
            >
              <Text style={styles.buttonBackText}>Back</Text>
            </Pressable>
            <View style={styles.buttonsContinueBackSpacing} />
            <Pressable
              onPress={() => createTeam(teamInfo)}
              style={[styles.buttonContinue, loadingStyle]}
              disabled={loading}
            >
              {!loading ? (
                <Text style={styles.buttonContinueText}>Finish</Text>
              ) : (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <AntDesign name="loading2" size={24} color="white" />
                </Animated.View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 30,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionContainer: {
    flex: 6,
    justifyContent: 'center'
  },
  questionProgress: {
    fontSize: 24,
    color: color.white,
    marginBottom: 15
  },
  question: {
    fontSize: 28,
    color: color.white,
    marginBottom: 30
  },
  buttonsContinueBack: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  buttonBack: {
    flex: 1.5,
    height: 50,
    borderRadius: 10,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBackText: {
    fontSize: 20,
    fontWeight: '500',
    color: color.secondary
  },
  buttonContinue: {
    flex: 3,
    height: 50,
    borderRadius: 10,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContinueText: {
    fontSize: 20,
    fontWeight: '500',
    color: color.white
  },
  buttonsContinueBackSpacing: {
    marginHorizontal: 10
  },
  input: {
    paddingTop: 10,
    fontSize: 20,
    minHeight: 74
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    width: 300,
    height: 160,
    resizeMode: 'contain'
  }
})

export default InvestorInformation
