import React, { useEffect, useState, useRef } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native'

import CircurlarProgressBar from './CircurlarProgressBar'

import { color } from '../../styles/colors'
import { textNormal } from '../../styles/containers'

const DURATION = 7000
const FADE_DURATION_IN = 300
const FADE_DURATION_OUT = 100
const SPACING_TOP = 40
const SPACING_BOTTOM = 10
const SPACING_INSIDE = 20
const SPACING_OUTSIDE = 20
const HEIGHT = 60
const BG_COLOR = color.secondary

const WIDTH = Dimensions.get('window').width - SPACING_OUTSIDE * 2

const Notification = ({ text, icon, id, index, remove, deletedItems }) => {
  const [visible, setVisible] = useState(true)
  const [previousIndex, setPreviousIndex] = useState()

  const opacity = useRef(new Animated.Value(0)).current
  const position = useRef(
    new Animated.ValueXY({ x: 0, y: (HEIGHT + SPACING_TOP) * -1 })
  ).current
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (
      (index !== previousIndex && previousIndex) ||
      (index !== previousIndex && previousIndex !== 0 && deletedItems > 0)
    ) {
      Animated.spring(position, {
        toValue: {
          x: 0,
          y: (HEIGHT + SPACING_BOTTOM) * (index - deletedItems)
        },
        tension: 50,
        friction: 6,
        useNativeDriver: true
      }).start()
    }
    setPreviousIndex(index)
  }, [index, deletedItems])

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_DURATION_IN,
        useNativeDriver: true
      }),
      Animated.spring(position, {
        toValue: {
          x: 0,
          y: (HEIGHT + SPACING_BOTTOM) * index
        },
        tension: 80,
        friction: 6,
        useNativeDriver: true
      })
    ]).start()

    // Animation of the circular progress bar, when it finishes it sets the notification visibility to false
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true
    }).start()
    setTimeout(() => {
      setVisible(false)
    }, DURATION)
  }, [])

  useEffect(() => {
    if (!visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: FADE_DURATION_OUT,
          useNativeDriver: true
        }),
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: (HEIGHT + SPACING_TOP) * -1
          },
          tension: 10,
          friction: 7,
          useNativeDriver: true
        })
      ]).start()
      remove(id)
    }
  }, [visible])

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      Animated.event(
        [
          null,
          {
            dy: pan.y
          }
        ],
        {
          useNativeDriver: false
        }
      )(e, gestureState)
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy <= 0) {
        setVisible(false)
      } else {
        Animated.spring(pan, {
          toValue: {
            x: 0,
            y: 0
          },
          tension: 40,
          friction: 7,
          useNativeDriver: true
        }).start()
      }
    }
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacity,
          transform: [
            { translateY: position.y },
            { translateY: Animated.divide(pan.y, 2) }
          ]
        }
      ]}
      {...panResponder.panHandlers}
    >
      {icon()}
      <Text style={[textNormal, styles.text]} numberOfLines={2}>
        {text}
      </Text>
      <CircurlarProgressBar
        progress={progress}
        style={{ color: color.primary }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    marginLeft: SPACING_OUTSIDE,
    paddingLeft: SPACING_INSIDE,
    paddingRight: SPACING_INSIDE,
    backgroundColor: BG_COLOR,
    borderRadius: 10
  },
  text: {
    marginLeft: 20,
    marginRight: 10,
    flex: 1
  }
})

export default Notification
