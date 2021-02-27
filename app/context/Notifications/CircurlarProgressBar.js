import React from 'react'
import { Animated } from 'react-native'

import Svg, { Circle } from 'react-native-svg'
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

import { color } from '../../styles/colors'

const PROGRESS_COLOR = color.white
const PROGRESS_BG = color.background
const PROGRESS_SIZE = 30

const CircurlarProgressBar = ({ progress }) => {
  const alpha = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2]
  })
  const strokeWidth = PROGRESS_SIZE / 2
  const radius = (PROGRESS_SIZE - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = Animated.multiply(alpha, radius)

  return (
    <Svg
      width={PROGRESS_SIZE}
      height={PROGRESS_SIZE}
      style={{ transform: [{ rotate: '-90deg' }] }}
    >
      <Circle
        stroke={PROGRESS_BG}
        fill="none"
        cx={PROGRESS_SIZE / 2}
        cy={PROGRESS_SIZE / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        stroke={PROGRESS_COLOR}
        fill="none"
        cx={PROGRESS_SIZE / 2}
        cy={PROGRESS_SIZE / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
    </Svg>
  )
}

export default CircurlarProgressBar
