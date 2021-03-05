import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDimensions } from '@react-native-community/hooks'

import config from '../../../../aws-exports'
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

import * as mime from 'react-native-mime-types'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

import useBehindKeyboard from '../../../context/InputBehindKeyboard'
import { useModals } from '../../../context/Modals'
import { useNotification } from '../../../context/Notifications'

import EditTeamMemberModal from '../../../components/modals/EditTeamMemberModal'

import { API, Storage } from 'aws-amplify'
import { listIndustrys } from '../../../../graphql/queries'

import { color } from '../../../styles/colors'
import {
  SPACING_BETWEEN,
  SPACING_BETWEEN_SMALL,
  SPACING_VIEW
} from '../../../styles/variables'
import {
  safeArea,
  scrollContainer,
  textInput,
  textNormal,
  textNormalBigger,
  userAvatar
} from '../../../styles/containers'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  createIndustryInvestorLink,
  createIndustryStartupLink,
  deleteIndustryInvestorLink,
  deleteIndustryStartupLink,
  updateInvestor,
  updateStartup
} from '../../../../graphql/mutations'
import AddTeamMemberModal from '../../../components/modals/AddTeamMemberModal'
import { Asset } from 'expo-asset'

const UpdateTeam = ({ route }) => {
  const navigation = useNavigation()
  const { showModal } = useModals()
  const { pushNotification } = useNotification()
  const { keyboardPosition, handleInputBehindKeyboard } = useBehindKeyboard()

  const [teamInfo, setTeamInfo] = useState({})

  const { team } = route.params
  const { admin } = route.params

  const logoPlaceholder = Asset.fromModule(
    require('../../../assets/profile_placeholder.png')
  ).uri

  const avatarPlaceholder = Asset.fromModule(
    require('../../../assets/profile_placeholder.png')
  ).uri

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
        setTeamInfo({ ...teamInfo, logoURI: image.uri })
      }
    } catch (error) {
      console.log('Error from pickImage', error)
    }
  }

  const [industries, setIndustries] = useState([])
  const getIndustries = async () => {
    let result = await API.graphql({
      query: listIndustrys
    })
    setIndustries(result.data.listIndustrys.items)
  }

  const isTeamIndustries = (industriesArray, industryID) => {
    return industriesArray.some(({ industry }) => industry.id === industryID)
  }
  const filterTeamIndustry = (industriesArray, industryID) => {
    return industriesArray.filter(({ industry }) => industry.id !== industryID)
  }
  const setTeamIndustries = (industriesArray) => {
    return {
      items: industriesArray.map((industry) => {
        return industry
      })
    }
  }
  const [activeStages, setActiveStages] = useState()
  const [notActiveStages, setNotActiveStages] = useState()

  useEffect(() => {
    getIndustries()
    if (team.investor) {
      setTeamInfo(team.investor)
    } else if (team.startup) {
      setTeamInfo(team.startup)
      setActiveStages(
        team.startup.stage === 'IDEA'
          ? 1
          : team.startup.stage === 'BUSINESS_PLAN'
          ? 2
          : team.startup.stage === 'MVP'
          ? 3
          : team.startup.stage === 'PAYING_CUSTOMERS'
          ? 4
          : ''
      )
      setNotActiveStages(
        team.startup.stage === 'IDEA'
          ? 3
          : team.startup.stage === 'BUSINESS_PLAN'
          ? 2
          : team.startup.stage === 'MVP'
          ? 1
          : team.startup.stage === 'PAYING_CUSTOMERS'
          ? 0
          : ''
      )
    }
  }, [])

  const [editMember, setEditMember] = useState({})
  const handleEditMemberModal = (member) => {
    setEditMember(member)
    showModal('EditMember')
  }

  const SuccessIcon = () => (
    <Ionicons name="ios-checkmark-circle-outline" size={30} color="white" />
  )

  const saveTeam = () => {
    if (team.investor) {
      saveInvestorTeam()
    } else if (team.startup) {
      saveStartupTeam()
    }
  }

  const saveInvestorTeam = async () => {
    try {
      let input = {
        id: team.investor.id
      }
      // Add or remove industries from Startup
      if (team.investor.industries !== teamInfo.industries) {
        teamInfo.industries.items.map(async ({ industry }) => {
          if (!isTeamIndustries(team.investor.industries.items, industry.id)) {
            await API.graphql({
              query: createIndustryInvestorLink,
              variables: {
                input: {
                  investorID: team.investor.id,
                  industryID: industry.id
                }
              }
            })
          }
        })
        team.investor.industries.items.map(async ({ industry }) => {
          if (!isTeamIndustries(teamInfo.industries.items, industry.id)) {
            await API.graphql({
              query: deleteIndustryInvestorLink,
              variables: {
                input: {
                  investorID: team.investor.id,
                  industryID: industry.id
                }
              }
            })
          }
        })
      }

      // Upload Logo if changed

      if (team.investor.logoURI !== teamInfo.logoURI) {
        const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(teamInfo.logoURI)
        const mimeType = mime.lookup(teamInfo.logoURI)

        const key = `${team.investor.id}/logo${extension && '.'}${extension}`

        let file = {
          bucket,
          key,
          region
        }

        const image = await fetch(teamInfo.logoURI)
        const blob = await image.blob()

        await Storage.put(key, blob, {
          contentType: mimeType
        })

        input = {
          ...input,
          logo: file
        }
      }

      if (team.investor.name !== teamInfo.name) {
        input = {
          ...input,
          name: teamInfo.name
        }
      }
      if (team.investor.capitalInvestMin !== teamInfo.capitalInvestMin) {
        input = {
          ...input,
          capitalInvestMin: teamInfo.capitalInvestMin
        }
      }
      if (team.investor.capitalInvestMax !== teamInfo.capitalInvestMax) {
        input = {
          ...input,
          capitalInvestMin: teamInfo.capitalInvestMax
        }
      }
      if (team.investor.stages !== teamInfo.stages) {
        input = {
          ...input,
          stages: teamInfo.stages
        }
      }
      if (team.investor.summary !== teamInfo.summary) {
        input = {
          ...input,
          summary: teamInfo.summary
        }
      }

      await API.graphql({
        query: updateInvestor,
        variables: {
          input
        }
      })

      pushNotification({
        text: 'Your team is successfully updated.',
        icon: SuccessIcon
      })
    } catch (error) {
      console.log('error from saveInvestorTeam: ', error)
    }
  }

  const saveStartupTeam = async () => {
    try {
      let input = {
        id: team.startup.id
      }
      // Add or remove industries from Startup
      if (team.startup.industries !== teamInfo.industries) {
        teamInfo.industries.items.map(async ({ industry }) => {
          if (!isTeamIndustries(team.startup.industries.items, industry.id)) {
            await API.graphql({
              query: createIndustryStartupLink,
              variables: {
                input: {
                  startupID: team.startup.id,
                  industryID: industry.id
                }
              }
            })
          }
        })
        team.startup.industries.items.map(async ({ industry }) => {
          if (!isTeamIndustries(teamInfo.industries.items, industry.id)) {
            await API.graphql({
              query: deleteIndustryStartupLink,
              variables: {
                input: {
                  startupID: team.startup.id,
                  industryID: industry.id
                }
              }
            })
          }
        })
      }

      // Upload Logo if changed

      if (team.startup.logoURI !== teamInfo.logoURI) {
        const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(teamInfo.logoURI)
        const mimeType = mime.lookup(teamInfo.logoURI)

        const key = `${team.startup.id}/logo${extension && '.'}${extension}`

        let file = {
          bucket,
          key,
          region
        }

        const image = await fetch(teamInfo.logoURI)
        const blob = await image.blob()

        await Storage.put(key, blob, {
          contentType: mimeType
        })

        input = {
          ...input,
          logo: file
        }
      }

      if (team.startup.name !== teamInfo.name) {
        input = {
          ...input,
          name: teamInfo.name
        }
      }
      if (team.startup.capitalDemand !== teamInfo.capitalDemand) {
        input = {
          ...input,
          capitalDemand: teamInfo.capitalDemand
        }
      }
      if (team.startup.stage !== teamInfo.stage) {
        input = {
          ...input,
          stage: teamInfo.stage
        }
      }
      if (team.startup.summary !== teamInfo.summary) {
        input = {
          ...input,
          summary: teamInfo.summary
        }
      }

      await API.graphql({
        query: updateStartup,
        variables: {
          input
        }
      })

      pushNotification({
        text: 'Your team is successfully updated.',
        icon: SuccessIcon
      })
    } catch (error) {
      console.log('error from saveStartupTeam: ', error)
    }
  }

  const SaveButton = () => (
    <Pressable onPress={() => saveTeam()} style={styles.saveButton}>
      <MaterialCommunityIcons
        name="content-save-edit"
        size={26}
        color={color.primary}
        style={styles.saveButtonIcon}
      />
    </Pressable>
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: SaveButton
    })
  }, [navigation, saveStartupTeam, saveInvestorTeam])

  if (team.investor) {
    const { investor } = team

    const [stages] = useState([
      'IDEA',
      'BUSINESS_PLAN',
      'MVP',
      'PAYING_CUSTOMERS'
    ])

    return (
      <>
        <SafeAreaView style={safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={color.background}
          />
          <Animated.ScrollView
            style={[
              styles.scrollview,
              scrollContainer,
              {
                transform: [{ translateY: keyboardPosition }],
                maxHeight: useDimensions().window.height - 65 - 64
              }
            ]}
            contentInset={{ bottom: 85 }}
          >
            <View styles={styles.container}>
              <Text style={styles.sub}>Your team</Text>
              <View style={styles.nameContainer}>
                <Image
                  style={userAvatar}
                  source={{
                    uri: teamInfo.logoURI ? teamInfo.logoURI : logoPlaceholder
                  }}
                />
                <Pressable onPress={() => pickImage()} style={styles.row}>
                  <Feather
                    name="upload"
                    style={{ fontSize: 28, marginRight: SPACING_BETWEEN_SMALL }}
                    color="white"
                  />
                  <Text style={textNormalBigger}>Pick your logo</Text>
                </Pressable>
              </View>
              <TextInput
                value={teamInfo.name}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, name: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Name of your team"
                keyboardAppearance="dark"
                style={[textInput, styles.input]}
              />
              <Text style={styles.sub}>Summary</Text>
              <TextInput
                value={teamInfo.summary}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, summary: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Describe your team here"
                keyboardAppearance="dark"
                multiline={true}
                style={[textInput, styles.inputMulti]}
              />
              <Text style={styles.sub}>Stages</Text>
              <View style={styles.tagContainer}>
                {stages.map((stage) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (teamInfo.stages.includes(stage)) {
                          let stages = teamInfo.stages.filter(
                            (item) => item !== stage
                          )
                          setTeamInfo({
                            ...teamInfo,
                            stages
                          })
                        } else {
                          setTeamInfo({
                            ...teamInfo,
                            stages: [...teamInfo.stages, stage]
                          })
                        }
                      }}
                      key={stage}
                      style={[
                        styles.tag,
                        {
                          backgroundColor: teamInfo.stages?.includes(stage)
                            ? color.primary
                            : color.secondary
                        }
                      ]}
                    >
                      <Text style={styles.tagText}>
                        {stage === 'IDEA'
                          ? 'Idea'
                          : stage === 'BUSINESS_PLAN'
                          ? 'Business plan'
                          : stage === 'MVP'
                          ? 'MVP'
                          : stage === 'PAYING_CUSTOMERS'
                          ? 'Paying customers'
                          : ''}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
              <Text style={styles.sub}>Industries</Text>
              <View style={styles.tagContainer}>
                {industries.map((industry) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (
                          isTeamIndustries(
                            teamInfo.industries.items,
                            industry.id
                          )
                        ) {
                          let industries = filterTeamIndustry(
                            teamInfo.industries.items,
                            industry.id
                          )
                          setTeamInfo({
                            ...teamInfo,
                            industries: setTeamIndustries(industries)
                          })
                        } else {
                          setTeamInfo({
                            ...teamInfo,
                            industries: {
                              items: [
                                ...teamInfo.industries.items,
                                { industry: industry }
                              ]
                            }
                          })
                        }
                      }}
                      key={industry.id}
                      style={[
                        styles.tag,
                        {
                          backgroundColor: isTeamIndustries(
                            teamInfo.industries.items,
                            industry.id
                          )
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
              <Text style={styles.sub}>Capital investment in USD</Text>
              <Text style={textNormal}>From</Text>
              <TextInput
                value={teamInfo.capitalInvestMin?.toString()}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, capitalInvestMin: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Amount in USD"
                keyboardAppearance="dark"
                style={[textInput]}
              />
              <Text style={[textNormal, { marginTop: 10 }]}>Up to</Text>
              <TextInput
                value={teamInfo.capitalInvestMax?.toString()}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, capitalInvestMax: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Amount in USD"
                keyboardAppearance="dark"
                style={[textInput]}
              />
              <View
                style={[
                  styles.row,
                  { marginTop: 20, justifyContent: 'space-between' }
                ]}
              >
                <Text style={styles.sub}>Team</Text>
                {admin === true && (
                  <Pressable
                    onPress={() => showModal('AddMember')}
                    style={styles.row}
                  >
                    <Text style={textNormal}>Add member</Text>
                    <AntDesign name="adduser" size={30} color={color.primary} />
                  </Pressable>
                )}
              </View>
              {investor.members.items.map((member) => (
                <View style={styles.member} key={member.user.id}>
                  <Image
                    style={styles.memberAvatar}
                    source={{
                      uri: member.user.avatarURI
                        ? member.user.avatarURI
                        : avatarPlaceholder
                    }}
                  />
                  <View>
                    <Text style={styles.memberName}>
                      {member.user.firstname} {member.user.lastname}
                    </Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>
                  {admin === true && (
                    <Pressable
                      style={styles.memberEdit}
                      onPress={() => handleEditMemberModal(member)}
                    >
                      <FontAwesome5
                        name="user-edit"
                        size={28}
                        color={color.white}
                      />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
        <AddTeamMemberModal
          currentMembers={investor.members.items}
          teamID={investor.teamID}
          navigation={navigation}
        />
        <EditTeamMemberModal memberData={editMember} navigation={navigation} />
      </>
    )
  } else if (team.startup) {
    const { startup } = team
    return (
      <>
        <SafeAreaView style={safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={color.background}
          />
          <Animated.ScrollView
            style={[
              scrollContainer,
              {
                transform: [{ translateY: keyboardPosition }]
              }
            ]}
            contentInset={{ bottom: 115 }}
          >
            <View styles={styles.container}>
              <Text style={styles.sub}>Your startup</Text>
              <View style={styles.nameContainer}>
                <Image
                  style={userAvatar}
                  source={{
                    uri: teamInfo.logoURI ? teamInfo.logoURI : logoPlaceholder
                  }}
                />
                <Pressable onPress={() => pickImage()} style={styles.row}>
                  <Feather
                    name="upload"
                    style={{ fontSize: 28, marginRight: SPACING_BETWEEN_SMALL }}
                    color="white"
                  />
                  <Text style={textNormalBigger}>Pick your logo</Text>
                </Pressable>
              </View>
              <TextInput
                value={teamInfo.name}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, name: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Name of your startup"
                keyboardAppearance="dark"
                style={[textInput, styles.input]}
              />
              <Text style={styles.sub}>Summary</Text>
              <TextInput
                value={teamInfo.summary}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, summary: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Describe your startup here"
                keyboardAppearance="dark"
                multiline={true}
                style={[textInput, styles.inputMulti]}
              />
              <Text style={styles.sub}>Stage</Text>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{ width: 20, height: 'auto', marginHorizontal: 20 }}
                >
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
                            teamInfo.stage === 'MVP'
                              ? color.primary
                              : color.white
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
              <Text style={styles.sub}>Industries</Text>
              <View style={styles.tagContainer}>
                {industries.map((industry) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (
                          isTeamIndustries(
                            teamInfo.industries.items,
                            industry.id
                          )
                        ) {
                          let industries = filterTeamIndustry(
                            teamInfo.industries.items,
                            industry.id
                          )
                          setTeamInfo({
                            ...teamInfo,
                            industries: setTeamIndustries(industries)
                          })
                        } else {
                          setTeamInfo({
                            ...teamInfo,
                            industries: {
                              items: [
                                ...teamInfo.industries.items,
                                { industry: industry }
                              ]
                            }
                          })
                        }
                      }}
                      key={industry.id}
                      style={[
                        styles.tag,
                        {
                          backgroundColor: isTeamIndustries(
                            teamInfo.industries.items,
                            industry.id
                          )
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
              <Text style={styles.sub}>Capital demand in USD</Text>
              <TextInput
                value={teamInfo.capitalDemand?.toString()}
                onChangeText={(value) =>
                  setTeamInfo({ ...teamInfo, capitalDemand: value })
                }
                onFocus={(e) => {
                  handleInputBehindKeyboard(e)
                }}
                placeholder="Amount in USD"
                keyboardAppearance="dark"
                style={[textInput]}
              />
              <View
                style={[
                  styles.row,
                  { marginTop: 20, justifyContent: 'space-between' }
                ]}
              >
                <Text style={styles.sub}>Team</Text>
                {admin === true && (
                  <Pressable
                    onPress={() => showModal('AddMember')}
                    style={styles.row}
                  >
                    <Text style={textNormal}>Add member</Text>
                    <AntDesign name="adduser" size={30} color={color.primary} />
                  </Pressable>
                )}
              </View>
              {startup.members.items.map((member) => (
                <View style={styles.member} key={member.user.id}>
                  <Image
                    style={styles.memberAvatar}
                    source={{
                      uri: member.user.avatarURI
                        ? member.user.avatarURI
                        : avatarPlaceholder
                    }}
                  />
                  <View>
                    <Text style={styles.memberName}>
                      {member.user.firstname} {member.user.lastname}
                    </Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>
                  {admin === true && (
                    <Pressable
                      style={styles.memberEdit}
                      onPress={() => handleEditMemberModal(member)}
                    >
                      <FontAwesome5
                        name="user-edit"
                        size={28}
                        color={color.white}
                      />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
        <AddTeamMemberModal
          currentMembers={startup.members.items}
          teamID={startup.teamID}
          navigation={navigation}
        />
        <EditTeamMemberModal memberData={editMember} navigation={navigation} />
      </>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollview: {
    paddingBottom: 20
  },
  container: {
    flex: 1,
    paddingBottom: 100,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW,
    backgroundColor: color.background
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  saveButton: {
    marginRight: SPACING_BETWEEN
  },
  input: {
    marginTop: 30
  },
  inputMulti: {
    paddingTop: 10,
    fontSize: 20,
    minHeight: 74
  },
  sub: {
    color: color.white,
    fontSize: 18,
    marginTop: 25,
    marginBottom: 15
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: color.white,
    fontSize: 26,
    fontWeight: '400'
  },
  settings: {
    marginLeft: 'auto'
  },
  summary: {
    marginTop: 15,
    color: color.white,
    fontSize: 18
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: color.primary
  },
  tagText: {
    fontSize: 16,
    color: color.white
  },
  stage: {
    height: 40,
    justifyContent: 'center'
  },
  stageText: {
    fontSize: 18,
    color: color.white
  },
  investmentMinMax: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  member: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: color.divider
  },
  memberAvatar: {
    height: 62,
    width: 62,
    borderRadius: 31,
    resizeMode: 'cover',
    marginRight: 15
  },
  memberName: {
    color: color.white,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4
  },
  memberRole: {
    color: color.white,
    opacity: 0.6,
    fontSize: 18
  },
  memberEdit: {
    marginLeft: 'auto'
  }
})

export default UpdateTeam
