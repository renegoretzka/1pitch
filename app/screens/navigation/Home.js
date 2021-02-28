import { Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  Image
} from 'react-native'

import Logo from '../../components/ui/Logo'
import { useUser } from '../../context/User'

import HomeStartup from './Home/HomeStartup'
import HomeInvestor from './Home/HomeInvestor'

import { color } from '../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textHeader,
  textNormal,
  textNormalBigger,
  userAvatar
} from '../../styles/containers'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Home = ({ navigation }) => {
  const { user } = useUser()
  const [currentTeam, setCurrentTeam] = useState({})
  const [teams, setTeams] = useState([])

  const setTeamImages = async (items) => {
    try {
      let newTeams = []
      for (let item of user.teams.items) {
        const { team } = item
        let logoURI
        let newItem = {}
        if (team.investor) {
          if (team.investor?.logo) {
            logoURI = await Storage.get(team.investor.logo.key)
            newItem = {
              ...item,
              team: {
                investor: {
                  ...team.investor,
                  logoURI
                }
              }
            }
          } else {
            newItem = {
              ...item,
              team: {
                investor: {
                  ...team.investor
                }
              }
            }
          }
        } else if (team.startup) {
          if (team.startup?.logo) {
            logoURI = await Storage.get(team.startup.logo.key)
            newItem = {
              ...item,
              team: {
                startup: {
                  ...team.startup,
                  logoURI
                }
              }
            }
          } else {
            newItem = {
              ...item,
              team: {
                startup: {
                  ...team.startup
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
      <ScrollView style={scrollContainer} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Logo />
          {Object.keys(currentTeam).length > 1 ? (
            <Pressable
              onPress={() => setCurrentTeam({})}
              style={{ flexDirection: 'row' }}
            >
              <Text style={[textNormal, { marginRight: 6 }]}>Switch team</Text>
              <MaterialCommunityIcons
                name="account-switch"
                size={28}
                color={color.white}
              />
            </Pressable>
          ) : (
            <></>
          )}
        </View>
        {!Object.keys(currentTeam).length ? (
          <View>
            <Text style={[textNormalBigger, { marginBottom: 25 }]}>
              Select one of your teams to continue.
            </Text>
            {teams?.map(({ team }) => {
              let teamData
              if (team.startup) {
                teamData = { ...team.startup, type: 'Startup' }
              } else if (team.investor) {
                teamData = { ...team.investor, type: 'Investor' }
              }
              return (
                <Pressable
                  onPress={() => {
                    setCurrentTeam(teamData)
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20
                  }}
                  key={teamData.id}
                >
                  {teamData.logoURI && (
                    <Image
                      style={userAvatar}
                      source={{ uri: teamData.logoURI }}
                    />
                  )}
                  <View>
                    <Text style={textNormal}>{teamData.type} Team</Text>
                    <Text style={textHeader}>{teamData.name}</Text>
                  </View>
                  <AntDesign
                    style={{ marginLeft: 'auto' }}
                    name="rightcircleo"
                    size={28}
                    color={color.primary}
                  />
                </Pressable>
              )
            })}
          </View>
        ) : currentTeam.type === 'Startup' ? (
          <HomeStartup teamData={currentTeam} />
        ) : (
          <HomeInvestor teamData={currentTeam} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
})

export default Home
