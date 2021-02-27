import React, { useEffect, useState, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text } from 'react-native'

import { color } from '../../styles/colors'
import { AntDesign } from '@expo/vector-icons'

const SubmitButton = ({ onPress, style, value, loading }) => {
  const [loadingStyle, setLoadingStyle] = useState({})
  const loadingSpinner = useRef(new Animated.Value(0)).current

  const spin = loadingSpinner.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    if (loading) {
      setLoadingStyle({
        backgroundColor: color.primaryOpacity
      })
      Animated.spring(loadingSpinner, {
        toValue: 1,
        tension: 2,
        friction: 10,
        useNativeDriver: true
      }).start()
    } else {
      setLoadingStyle({
        backgroundColor: color.primary
      })
      Animated.timing(loadingSpinner).stop()
    }
  }, [loading])

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, style, loadingStyle]}
      disabled={loading}
    >
      {!loading ? (
        <Text style={styles.buttonText}>{value}</Text>
      ) : (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <AntDesign name="loading2" size={24} color="white" />
        </Animated.View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 24,
    backgroundColor: color.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: color.white
  }
})

export default SubmitButton
