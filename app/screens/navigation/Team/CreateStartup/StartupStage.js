import React, { useState, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'

import { color } from '../../../../styles/colors'
import { safeArea } from '../../../../styles/containers'
import { SPACING_VIEW } from '../../../../styles/variables'

const StartupStage = ({ navigation, route }) => {
  const [teamInfo, setTeamInfo] = useState(route.params?.teamInfo)

  const [activeStages, setActiveStages] = useState(1)
  const [notActiveStages, setNotActiveStages] = useState(3)

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
            <Text style={styles.questionProgress}>Questionnaire 4 of 6</Text>
            <Text style={styles.question}>
              What is the current stage of your startup?
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 20, height: 'auto', marginHorizontal: 20 }}>
                <View
                  style={{
                    flex: activeStages,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: color.primary
                  }}
                />
                <View
                  style={{
                    flex: notActiveStages,
                    width: 20,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: color.secondary
                  }}
                />
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    setTeamInfo({ ...teamInfo, stage: 'IDEA' })
                    setActiveStages(1)
                    setNotActiveStages(4)
                  }}
                  style={styles.stage}
                >
                  <Text
                    style={[
                      styles.stageText,
                      {
                        color:
                          teamInfo.stage === 'IDEA'
                            ? color.primary
                            : color.white
                      }
                    ]}
                  >
                    Idea
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTeamInfo({ ...teamInfo, stage: 'BUSINESS_PLAN' })
                    setActiveStages(2)
                    setNotActiveStages(2)
                  }}
                  style={styles.stage}
                >
                  <Text
                    style={[
                      styles.stageText,
                      {
                        color:
                          teamInfo.stage === 'BUSINESS_PLAN'
                            ? color.primary
                            : color.white
                      }
                    ]}
                  >
                    Business plan
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTeamInfo({ ...teamInfo, stage: 'MVP' })
                    setActiveStages(3)
                    setNotActiveStages(1)
                  }}
                  style={styles.stage}
                >
                  <Text
                    style={[
                      styles.stageText,
                      {
                        color:
                          teamInfo.stage === 'MVP' ? color.primary : color.white
                      }
                    ]}
                  >
                    MVP
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTeamInfo({ ...teamInfo, stage: 'PAYING_CUSTOMERS' })
                    setActiveStages(4)
                    setNotActiveStages(0)
                  }}
                  style={styles.stage}
                >
                  <Text
                    style={[
                      styles.stageText,
                      {
                        color:
                          teamInfo.stage === 'PAYING_CUSTOMERS'
                            ? color.primary
                            : color.white
                      }
                    ]}
                  >
                    Paying customers
                  </Text>
                </Pressable>
              </View>
            </View>
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
              onPress={() => navigation.push('StartupCapital', { teamInfo })}
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
  stage: {
    height: 50,
    justifyContent: 'center'
  },
  stageText: {
    fontSize: 24,
    color: color.white
  }
})

export default StartupStage
