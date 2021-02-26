import { API, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform
} from 'react-native'

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
    setTeamImages(user.teams.items).then((newTeams) => {
      setTeams(newTeams)
    })
  }, [user])

  useEffect(() => {
    //console.log('new teams', teams)
  }, [teams])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <View style={styles.container} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Text style={textHeader}>Your teams</Text>
        </View>
        <View style={{ flex: 1 }}>
          {teams.length ? (
            <FlatList
              data={teams}
              renderItem={TeamItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={TeamSeperator}
            />
          ) : (
            <>
              <Text style={[textNormal, { marginTop: 15 }]}>
                You dont have any teams yet.
              </Text>
              <SubmitButton
                onPress={() => navigation.push('CreateTeam')}
                value="Create your first team"
              />
            </>
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
    marginBottom: 10,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
  },
  container: {
    flex: 1,
    marginBottom: 65
  }
})

export default Teams
