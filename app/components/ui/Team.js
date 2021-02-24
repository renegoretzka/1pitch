import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { color } from '../../styles/colors'
import {
  FONT_SIZE_INFO,
  FONT_SIZE_SMALL,
  FONT_WEIGHT_BOLD
} from '../../styles/variables'

import { FontAwesome } from '@expo/vector-icons'

const Team = ({ teamInfo }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.image}>
        <Image
          style={styles.avatar}
          source={require('../../assets/profilbild.jpg')}
        />
        <View style={styles.iconContainer}>
          <FontAwesome
            name="handshake-o"
            size={14}
            color={color.primary}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.text} numberOfLines={2}>
          <Text style={styles.object}>Marko</Text> has bought your product{' '}
          <Text style={styles.object}>Assassin's Creed Valhalla</Text> for{' '}
          <Text style={styles.object}>20.00 €</Text>
        </Text>
        <Text style={styles.timestamp}>15 minutes ago</Text>
      </View>
    </View>
  )
}

const TeamSeperator = () => <Divider />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25
  },
  iconContainer: {
    width: 22,
    height: 22,
    marginTop: 35,
    marginLeft: -15,
    marginRight: 5,
    borderRadius: 11,
    backgroundColor: color.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    flex: 1,
    justifyContent: 'space-between'
  },
  text: {
    color: color.white,
    fontSize: FONT_SIZE_INFO,
    marginBottom: 5,
    fontWeight: '200'
  },
  object: {
    fontWeight: FONT_WEIGHT_BOLD
  },
  timestamp: {
    color: color.lightWhite,
    fontSize: FONT_SIZE_SMALL
  }
})

export { Team, TeamSeperator }
