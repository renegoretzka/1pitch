import React from 'react'
import { Animated } from 'react-native'

import Svg, { Circle } from 'react-native-svg'
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

import { color } from '../../styles/colors'

const PROGRESS_COLOR = color.white
const PROGRESS_BG = color.background

const CircurlarProgressBar = ({
  progress,
  size = 30,
  colorbg,
  colorprogress
}) => {
  const alpha = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2]
  })
  const strokeWidth = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = Animated.multiply(alpha, radius)

  return (
    <Svg
      width={size}
      height={size}
      style={{ transform: [{ rotate: '-90deg' }] }}
    >
      <Circle
        stroke={colorbg ? colorbg : PROGRESS_BG}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        stroke={colorprogress ? colorprogress : PROGRESS_COLOR}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
    </Svg>
  )
}

export default CircurlarProgressBar
