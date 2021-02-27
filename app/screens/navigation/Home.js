import React, { useEffect, useState } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable
} from 'react-native'

import Logo from '../../components/ui/Logo'
import { useUser } from '../../context/User'

import { color } from '../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textHeader,
  textNormalBigger
} from '../../styles/containers'

const Home = ({ navigation }) => {
  const { user } = useUser()
  const [currentTeam, setCurrentTeam] = useState({})

  useEffect(() => {
    /*if (user?.teams?.items.length === 1) {
      setCurrentTeam(user.teams.items[0])
    }*/
  }, [user])

  useEffect(() => {
    console.log(currentTeam)
  }, [currentTeam])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <ScrollView style={scrollContainer} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Logo />
        </View>
        {!Object.keys(currentTeam).length && (
          <View>
            <Text style={textNormalBigger}>
              Select one of your teams to continue.
            </Text>
            {user.teams.items?.map(({ teamItem }) => {
              let team
              if (teamItem?.startup) {
                team = teamItem?.startup
              }
              return (
                <Pressable key={team?.id}>
                  <Text style={textHeader}>{team?.name}</Text>
                </Pressable>
              )
            })}
          </View>
        )}
        <View></View>
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
