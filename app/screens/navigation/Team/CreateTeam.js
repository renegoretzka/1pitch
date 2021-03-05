import React, { useState, useEffect } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { color } from '../../../styles/colors'
import { safeArea } from '../../../styles/containers'
import { SPACING_BETWEEN, SPACING_VIEW } from '../../../styles/variables'

const CreateTeam = ({ navigation }) => {
  const initialTeamInfo = {
    type: '',
    name: ''
  }

  const [teamInfo, setTeamInfo] = useState(initialTeamInfo)

  const handleGoBack = () => {
    const stackNavigator = navigation.dangerouslyGetParent()
    stackNavigator.setOptions({ tabBarVisible: true })
    navigation.goBack()
  }

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
            <Text style={styles.questionProgress}>Questionnaire 1 of 6</Text>
            <Text style={styles.question}>Are you an investor or startup?</Text>
            <View style={styles.row}>
              <Pressable
                onPress={() => setTeamInfo({ ...teamInfo, type: 'Startup' })}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      teamInfo.type === 'Startup'
                        ? color.primary
                        : color.secondary
                  }
                ]}
              >
                <Text style={styles.optionButtonText}>Startup</Text>
              </Pressable>
              <View style={styles.optionSpacing} />
              <Pressable
                onPress={() => setTeamInfo({ ...teamInfo, type: 'Investor' })}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      teamInfo.type === 'Investor'
                        ? color.primary
                        : color.secondary
                  }
                ]}
              >
                <Text style={styles.optionButtonText}>Investor</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonsContinueBack}>
            <Pressable onPress={() => handleGoBack()} style={styles.buttonBack}>
              <Text style={styles.buttonBackText}>Back</Text>
            </Pressable>
            <View style={styles.buttonsContinueBackSpacing} />
            <Pressable
              onPress={() =>
                navigation.push(
                  teamInfo.type === 'Startup' ? 'StartupName' : 'InvestorName',
                  { teamInfo }
                )
              }
              style={[
                styles.buttonContinue,
                !teamInfo.type && { backgroundColor: color.primaryOpacity }
              ]}
              disabled={teamInfo.type ? false : true}
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
  optionButton: {
    flex: 1,
    height: 80,
    marginTop: SPACING_BETWEEN,
    borderRadius: 10,
    backgroundColor: color.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionButtonText: {
    fontSize: 36,
    color: color.white
  },
  optionSpacing: {
    marginHorizontal: 10
  },
  about: {
    marginTop: 40,
    height: 80
  }
})

export default CreateTeam
