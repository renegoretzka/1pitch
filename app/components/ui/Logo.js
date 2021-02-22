import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { color } from '../../styles/colors'

const Logo = ({ size = 50 }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.white, { fontSize: size }]}>1</Text>
      <Text style={[styles.primary, { fontSize: size }]}>PITCH</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  white: {
    fontWeight: 'bold',
    color: color.white,
    letterSpacing: 2
  },
  primary: {
    fontWeight: 'bold',
    color: color.primary,
    letterSpacing: 2
  }
})

export default Logo
