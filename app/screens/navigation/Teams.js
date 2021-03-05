import { API, nav, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  Pressable
} from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

import SubmitButton from '../../components/ui/SubmitButton'

import { TeamItem, TeamSeperator } from '../../components/ui/TeamItem'
import { useUser } from '../../context/User'

import { color } from '../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textHeader,
  textNormal
} from '../../styles/containers'
import { SPACING_VIEW } from '../../styles/variables'

import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

const Teams = ({ navigation }) => {
  const { user } = useUser()
  const [teams, setTeams] = useState([])

  const setTeamImages = async (items) => {
    try {
      let newTeams = []
      for (let item of user.teams.items) {
        const { team } = item
        let logoURI
        let avatarURI
        let newItem = {}
        let membersWithAvatar = []
        if (team.investor) {
          for (let member of team.investor.members.items) {
            if (member.user.avatar) {
              avatarURI = await Storage.get(member.user.avatar.key)
              membersWithAvatar = [
                ...membersWithAvatar,
                { ...member, user: { ...member.user, avatarURI } }
              ]
            } else {
              membersWithAvatar = [...membersWithAvatar, { ...member }]
            }
          }
          if (team.investor?.logo) {
            logoURI = await Storage.get(team.investor.logo.key)
            newItem = {
              ...item,
              team: {
                investor: {
                  ...team.investor,
                  logoURI,
                  members: { items: membersWithAvatar }
                }
              }
            }
          } else {
            newItem = {
              ...item,
              team: {
                investor: {
                  ...team.investor,
                  members: { items: membersWithAvatar }
                }
              }
            }
          }
        } else if (team.startup) {
          for (let member of team.startup.members.items) {
            if (member.user.avatar) {
              avatarURI = await Storage.get(member.user.avatar.key)
              membersWithAvatar = [
                ...membersWithAvatar,
                { ...member, user: { ...member.user, avatarURI } }
              ]
            } else {
              membersWithAvatar = [...membersWithAvatar, { ...member }]
            }
          }
          if (team.startup?.logo) {
            logoURI = await Storage.get(team.startup.logo.key)
            newItem = {
              ...item,
              team: {
                startup: {
                  ...team.startup,
                  logoURI,
                  members: { items: membersWithAvatar }
                }
              }
            }
          } else {
            newItem = {
              ...item,
              team: {
                startup: {
                  ...team.startup,
                  members: { items: membersWithAvatar }
                }
              }
            }
          }
        }
        newTeams = [...newTeams, newItem]
      }
      return newTeams
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.teams?.items) {
      setTeamImages(user?.teams?.items).then((newTeams) => {
        setTeams(newTeams)
      })
    }
  }, [user])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <View
        style={[
          styles.container,
          {
            maxHeight: useDimensions().window.height - 65
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={textHeader}>Your teams</Text>
          {teams.length ? (
            <Pressable
              onPress={() => navigation.push('CreateTeam')}
              style={styles.addTeam}
            >
              <Text style={styles.addTeamText}>Add team</Text>
              <Ionicons
                name="ios-add-circle-outline"
                size={34}
                color={color.primary}
              />
            </Pressable>
          ) : (
            <></>
          )}
        </View>
        <View style={{ flex: 1 }}>
          {teams.length ? (
            <FlatList
              data={teams}
              renderItem={({ item }) => <TeamItem item={item} />}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={TeamSeperator}
            />
          ) : (
            <View style={styles.safeContainer}>
              <Text style={[textNormal, { marginTop: 15 }]}>
                You dont have any teams yet.
              </Text>
              <SubmitButton
                onPress={() => navigation.push('CreateTeam')}
                value="Create your first team"
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
  },
  addTeam: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addTeamText: {
    color: color.white,
    fontSize: 18,
    marginRight: 10
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  safeContainer: {
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
  }
})

export default Teams
