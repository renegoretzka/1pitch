import React, { useState } from 'react'
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Divider from './Divider'
import { color } from '../../styles/colors'
import { textNormal, userAvatar } from '../../styles/containers'

import { Ionicons } from '@expo/vector-icons'
import { SPACING_VIEW } from '../../styles/variables'

const TeamItem = ({ item }) => {
  const { team } = item
  const avatarPlaceholder = Image.resolveAssetSource(
    require('../../assets/profile_placeholder.png')
  ).uri

  if (team.investor) {
    const { investor } = team
    return (
      <View style={styles.container}>
        <Text style={styles.sub}>Investor Team</Text>
        <View style={styles.nameContainer}>
          {investor.logoURI && (
            <Image style={userAvatar} source={{ uri: investor.logoURI }} />
          )}
          <Text style={styles.name}>{investor.name}</Text>
          <Pressable
            style={styles.settings}
            onPress={() => navigation.push('UpdateTeam', team)}
          >
            <Ionicons name="md-settings" size={24} color={color.white} />
          </Pressable>
        </View>
        <Text style={styles.summary}>{investor.summary}</Text>
        <Text style={styles.sub}>Stage</Text>
        <View style={styles.tagContainer}>
          {investor.stages.map((stageItem) => {
            const stage =
              stageItem === 'IDEA'
                ? 'Idea'
                : stageItem === 'BUSINESS_PLAN'
                ? 'Business plan'
                : stageItem === 'MVP'
                ? 'MVP built'
                : stageItem === 'PAYING_CUSTOMERS'
                ? 'Paying customers'
                : ''
            return (
              <View style={styles.tag} key={stage}>
                <Text style={styles.tagText}>{stage}</Text>
              </View>
            )
          })}
        </View>
        <Text style={styles.sub}>Industries</Text>
        <View style={styles.tagContainer}>
          {investor.industries.items.map(({ industry }) => (
            <View style={styles.tag} key={industry.id}>
              <Text style={styles.tagText}>{industry.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sub}>Capital investment</Text>
        <View style={styles.investmentMinMax}>
          <Text style={textNormal}>From</Text>
          <Text style={textNormal}>Up to</Text>
        </View>
        <View style={styles.investmentMinMax}>
          <Text style={textNormal}>
            {investor.capitalInvestMin
              ? investor.capitalInvestMin.toLocaleString() + ' USD'
              : ''}
          </Text>
          <Text style={textNormal}>
            {investor.capitalInvestMax
              ? investor.capitalInvestMax.toLocaleString() + ' USD'
              : ''}
          </Text>
        </View>
        <Text style={styles.sub}>Team</Text>
        <View style={styles.tagContainer}>
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
              {member.user.linkedIn && (
                <Pressable
                  style={styles.memberLinkedIn}
                  onPress={() =>
                    Linking.openURL('https://' + member.user.linkedIn)
                  }
                >
                  <Ionicons
                    name="logo-linkedin"
                    size={28}
                    color={color.white}
                  />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </View>
    )
  } else if (team.startup) {
    const { startup } = team
    const stage = {
      text:
        startup.stage === 'IDEA'
          ? 'Idea'
          : startup.stage === 'BUSINESS_PLAN'
          ? 'Business plan'
          : startup.stage === 'MVP'
          ? 'MVP built'
          : startup.stage === 'PAYING_CUSTOMERS'
          ? 'Paying customers'
          : '',
      current:
        startup.stage === 'IDEA'
          ? 1
          : startup.stage === 'BUSINESS_PLAN'
          ? 2
          : startup.stage === 'MVP'
          ? 3
          : startup.stage === 'PAYING_CUSTOMERS'
          ? 4
          : '',
      left:
        startup.stage === 'IDEA'
          ? 3
          : startup.stage === 'BUSINESS_PLAN'
          ? 2
          : startup.stage === 'MVP'
          ? 1
          : startup.stage === 'PAYING_CUSTOMERS'
          ? 0
          : ''
    }
    return (
      <View style={styles.container}>
        <Text style={styles.sub}>Startup Team</Text>
        <View style={styles.nameContainer}>
          {startup.logoURI && (
            <Image style={userAvatar} source={{ uri: startup.logoURI }} />
          )}
          <Text style={styles.name}>{startup.name}</Text>
          <Pressable
            style={styles.settings}
            onPress={() => navigation.push('UpdateTeam', team)}
          >
            <Ionicons name="md-settings" size={24} color={color.white} />
          </Pressable>
        </View>
        <Text style={styles.summary}>{startup.summary}</Text>
        <Text style={styles.sub}>Stage</Text>
        <View style={styles.stageContainer}>
          <View style={[styles.stageCurrent, { flex: stage.current }]}>
            <Text style={styles.stageText}>{stage.text}</Text>
          </View>
          <View style={[styles.stageFull, { flex: stage.left }]} />
        </View>
        <Text style={styles.sub}>Industries</Text>
        <View style={styles.tagContainer}>
          {startup.industries.items.map(({ industry }) => (
            <View style={styles.tag} key={industry.id}>
              <Text style={styles.tagText}>{industry.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sub}>Capital demand</Text>
        <Text style={textNormal}>
          {startup.capitalDemand
            ? startup.capitalDemand.toLocaleString() + ' USD'
            : 'Please set your capital demand for your startup'}
        </Text>
        <Text style={styles.sub}>Team</Text>
        <View style={styles.tagContainer}>
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
              {member.user.linkedIn && (
                <Pressable
                  style={styles.memberLinkedIn}
                  onPress={() =>
                    Linking.openURL('https://' + member.user.linkedIn)
                  }
                >
                  <Ionicons
                    name="logo-linkedin"
                    size={28}
                    color={color.white}
                  />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const TeamSeperator = () => <Divider />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingLeft: SPACING_VIEW,
    paddingRight: SPACING_VIEW
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
    borderRadius: 20,
    backgroundColor: color.primary
  },
  tagText: {
    fontSize: 16,
    color: color.white
  },
  stageContainer: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: color.secondary,
    borderRadius: 15
  },
  stageCurrent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: color.primary,
    borderRadius: 15
  },
  stageText: {
    marginRight: 15,
    color: color.white,
    fontWeight: '500'
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
    alignItems: 'center'
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
  memberLinkedIn: {
    marginLeft: 'auto'
  }
})

export { TeamItem, TeamSeperator }
