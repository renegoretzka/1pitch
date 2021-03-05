import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { color } from './colors'
import * as VARS from './variables'
import { useDimensions } from '@react-native-community/hooks'

export const safeArea = {
  flex: 1,
  backgroundColor: color.background
}

export const scrollContainer = {
  flex: 1,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  paddingLeft: VARS.SPACING_VIEW,
  paddingRight: VARS.SPACING_VIEW,
  paddingBottom: Platform.OS === 'ios' ? 105 : 65,
  backgroundColor: color.background,
  maxHeight: useDimensions().window.height
}

export const textHeader = {
  color: color.white,
  fontSize: VARS.FONT_SIZE_HEADER,
  fontWeight: VARS.FONT_WEIGHT_BOLD,
  letterSpacing: VARS.FONT_LETTER_SPACING
}

export const textNormal = {
  color: color.white,
  fontSize: VARS.FONT_SIZE_TEXT,
  letterSpacing: VARS.FONT_LETTER_SPACING
}

export const textNormalBigger = {
  color: color.white,
  fontSize: VARS.FONT_SIZE_TEXT_BIGGER,
  letterSpacing: VARS.FONT_LETTER_SPACING
}

export const textInfo = {
  color: color.lightWhite,
  fontSize: VARS.FONT_SIZE_INFO,
  letterSpacing: VARS.FONT_LETTER_SPACING
}

export const textLink = {
  color: color.white,
  fontSize: VARS.FONT_SIZE_TEXT,
  fontWeight: VARS.FONT_WEIGHT_BOLD,
  letterSpacing: VARS.FONT_LETTER_SPACING,
  textDecorationLine: 'underline'
}

export const inputText = {
  borderRadius: 10,
  backgroundColor: color.white,
  color: color.secondary
}

export const textInput = {
  minHeight: 50,
  fontSize: 20,
  paddingLeft: 15,
  paddingRight: 15,
  color: color.accent,
  backgroundColor: color.white,
  borderRadius: 10
}
export const textInputMulti = {
  paddingTop: 10
}

export const inputError = {
  color: color.primary,
  fontSize: 18,
  fontWeight: '600',
  textAlign: 'center',
  marginTop: 5
}

export const userAvatar = {
  width: 80,
  height: 80,
  resizeMode: 'cover',
  borderRadius: 40,
  marginRight: VARS.SPACING_BETWEEN
}
