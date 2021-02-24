import React, { useState, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native'
import useBehindKeyboard from '../../../../context/InputBehindKeyboard'

import { color } from '../../../../styles/colors'
import { safeArea, textInput } from '../../../../styles/containers'
import { SPACING_VIEW } from '../../../../styles/variables'

const StartupCapital = ({ navigation, route }) => {
  const [teamInfo, setTeamInfo] = useState(route.params?.teamInfo)
  const { handleInputBehindKeyboard } = useBehindKeyboard()

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
            <Text style={styles.questionProgress}>Questionnaire 5 of 5</Text>
            <Text style={styles.question}>
              How much capital you want to raise?
            </Text>
            <TextInput
              value={teamInfo.capitalDemand}
              onChangeText={(value) =>
                setTeamInfo({ ...teamInfo, capitalDemand: value })
              }
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Amount in USD"
              keyboardAppearance="dark"
              keyboardType="number-pad"
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
              onPress={() => navigation.push('StartupIndustry', { teamInfo })}
              style={styles.buttonContinue}
            >
              <Text style={styles.buttonContinueText}>Continue</Text>
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
    fontSize: 34,
    color: color.white,
    marginBottom: 30
  },
  buttonsContinueBack: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end'
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
    fontSize: 30,
    minHeight: 60
  }
})

export default StartupCapital
