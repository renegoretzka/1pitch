import { API } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import { listIndustrys } from '../../../../../graphql/queries'

import { color } from '../../../../styles/colors'
import { safeArea } from '../../../../styles/containers'
import { SPACING_VIEW } from '../../../../styles/variables'

const StartupIndustry = ({ navigation, route }) => {
  const [teamInfo, setTeamInfo] = useState(route.params?.teamInfo)

  const [industries, setIndustries] = useState([])

  const getIndustries = async () => {
    let result = await API.graphql({
      query: listIndustrys
    })
    setIndustries(result.data.listIndustrys.items)
  }

  useEffect(() => {
    getIndustries()
  }, [])

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

  const IndustryTags = ({ industries }) => {
    return (
      <View style={styles.tagContainer}>
        {industries.map((industry) => {
          return (
            <Pressable
              onPress={() => {
                if (teamInfo.industries.includes(industry.id)) {
                  let industries = teamInfo.industries.filter(
                    (item) => item !== industry.id
                  )
                  setTeamInfo({
                    ...teamInfo,
                    industries
                  })
                } else {
                  setTeamInfo({
                    ...teamInfo,
                    industries: [...teamInfo.industries, industry.id]
                  })
                }
              }}
              key={industry.id}
              style={[
                styles.tag,
                {
                  backgroundColor: teamInfo.industries.includes(industry.id)
                    ? color.primary
                    : color.secondary
                }
              ]}
            >
              <Text style={styles.tagText}>{industry.name}</Text>
            </Pressable>
          )
        })}
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionProgress}>Questionnaire 3 of 5</Text>
            <Text style={styles.question}>
              In which industries is your startup?
            </Text>
            {industries?.length ? (
              <IndustryTags industries={industries} />
            ) : (
              <Text>No industries found.</Text>
            )}
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
              onPress={() => navigation.push('StartupStage', { teamInfo })}
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
    fontSize: 34,
    minHeight: 80
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 15,
    borderRadius: 20
  },
  tagText: {
    fontSize: 16,
    color: color.white
  }
})

export default StartupIndustry
