import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Keyboard } from 'react-native'

const useBehindKeyboard = () => {
  const keyboardPosition = useRef(new Animated.Value(0)).current
  const windowHeight = Dimensions.get('screen').height

  const handleInputBehindKeyboard = (e) => {
    e.target.measureInWindow((y, height) => {
      if (height > windowHeight - 350) {
        Animated.timing(keyboardPosition, {
          toValue: -300,
          duration: 190,
          useNativeDriver: true
        }).start()
      }
    })
  }

  const handleKeyboardDidHide = () => {
    Animated.timing(keyboardPosition, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', handleKeyboardDidHide)
    return () => {
      Keyboard.removeListener('keyboardWillHide', handleKeyboardDidHide)
    }
  }, [])

  return {
    keyboardPosition,
    handleInputBehindKeyboard
  }
}

export default useBehindKeyboard
