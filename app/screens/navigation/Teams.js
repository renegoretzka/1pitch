import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { View, StatusBar, StyleSheet, SafeAreaView, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { myTeams } from '../../../graphql/Custom/team.queries'
import SubmitButton from '../../components/ui/SubmitButton'

import { Team, TeamSeperator } from '../../components/ui/Team'

import { color } from '../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textHeader,
  textNormal
} from '../../styles/containers'

const Teams = ({ navigation }) => {
  const [teams, setTeams] = useState()

  const getMyTeams = async () => {
    let result = await API.graphql({
      query: myTeams
    })
    setTeams(result.data.me.teams.items)
  }

  useEffect(() => {
    getMyTeams()
  }, [])

  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <View style={scrollContainer} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Text style={textHeader}>Your teams</Text>
        </View>
        <View>
          {teams?.length ? (
            <FlatList
              data={teams}
              renderItem={Team}
              keyExtractor={(team) => team.id}
              ItemSeparatorComponent={TeamSeperator}
            />
          ) : (
            <>
              <Text style={textNormal}>You dont have any teams yet.</Text>
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
    marginBottom: 15
  }
})

export default Teams
