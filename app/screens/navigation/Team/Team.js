import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import Divider from './Divider'
import { color } from '../../styles/colors'

const TeamItem = ({ teamData }) => {
  const [team, setTeam] = useState()

  useEffect(() => {
    if (teamData.team.investor) {
      setTeam({ ...teamData.team.investor, type: 'Investor' })
    } else if (teamData.team.startup) {
      setTeam({ ...teamData.team.startup, type: 'Startup' })
    }
  }, [])

  useEffect(() => {
    console.log(team)
  }, [team])

  const TeamStartup = ({ startup }) => (
    <>
      <Text style={styles.sub}>Startup Team</Text>
      <Text style={styles.name}>{startup.name}</Text>
      <Text style={styles.sub}>Industries</Text>
      <View style={styles.tagContainer}>
        {startup.industries.items.map(({ industry }) => (
          <>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{industry.name}</Text>
            </View>
          </>
        ))}
      </View>
    </>
  )
  const TeamInvestor = ({ investor }) => (
    <>
      <Text style={styles.sub}>Investor Team</Text>
      <Text style={styles.name}>{investor.name}</Text>
    </>
  )

  return (
    <View style={styles.container}>
      {team?.type === 'Startup' ? (
        <TeamStartup startup={team} />
      ) : team?.type === 'Investor' ? (
        <TeamInvestor investor={team} />
      ) : (
        <Text>Loading teams...</Text>
      )}
    </View>
  )
}

const TeamSeperator = () => <Divider />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  sub: {
    color: color.white,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10
  },
  name: {
    color: color.white,
    fontSize: 26,
    fontWeight: '400'
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
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: color.primary
  },
  tagText: {
    fontSize: 16,
    color: color.white
  }
})

export { TeamItem, TeamSeperator }
