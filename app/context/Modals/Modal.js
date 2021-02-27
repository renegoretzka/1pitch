import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Pressable
} from 'react-native'

import { color } from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'
import { useModals } from '../Modals'
import useBehindKeyboard from '../InputBehindKeyboard'

const TOTAL_HEIGHT = Dimensions.get('window').height
const FADE_DURATION = 300

const Modal = ({
  children,
  name,
  header,
  spacing,
  navigation,
  hideNavigation
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const position = useRef(new Animated.ValueXY({ x: 0, y: TOTAL_HEIGHT }))
    .current
  const stackNavigator = useRef(navigation.dangerouslyGetParent()).current
  const { modalIsShown, hideModal } = useModals()
  const [active, setActive] = useState(false)

  const handleShowModal = () => {
    setActive(true)
    if (hideNavigation) {
      stackNavigator.setOptions({ tabBarVisible: false })
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: FADE_DURATION,
        useNativeDriver: true
      }),
      Animated.spring(position, {
        toValue: {
          x: 0,
          y: spacing
        },
        useNativeDriver: true
      })
    ]).start()
  }

  const handleHideModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true
      }),
      Animated.spring(position, {
        toValue: {
          x: 0,
          y: TOTAL_HEIGHT
        },
        tension: 4,
        useNativeDriver: true
      })
    ]).start()
    setTimeout(() => {
      if (hideNavigation) {
        stackNavigator.setOptions({ tabBarVisible: true })
      }
      setActive(false)
      pan.y.setValue(0)
    }, FADE_DURATION)
  }

  useEffect(() => {
    if (modalIsShown(name)) {
      handleShowModal()
    } else if (!modalIsShown(name) && active) {
      handleHideModal()
    }
  }, [modalIsShown(name)])

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy >= 0) {
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
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy >= 0) {
        hideModal(name)
      }
    }
  })

  return (
    <>
      {active && (
        <View style={styles.container}>
          <Animated.View
            style={[styles.backdrop, { opacity: opacity }]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [
                  { translateY: position.y },
                  { translateY: Animated.divide(pan.y, 2) }
                ]
              }
            ]}
          >
            <Animated.View style={styles.panView} {...panResponder.panHandlers}>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  hideModal(name)
                }}
                hitSlop={50}
              >
                <View style={styles.closeBar}></View>
              </Pressable>
            </Animated.View>
            <View style={[styles.header]}>
              <Pressable
                onPress={() => {
                  hideModal(name)
                }}
              >
                <Ionicons name="ios-close" style={styles.closeIcon} />
              </Pressable>
              <Text style={styles.headerText}>{header}</Text>
            </View>
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000'
  },
  modal: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: color.secondary
  },
  panView: {
    flexDirection: 'row',
    height: 20,
    paddingBottom: 5,
    justifyContent: 'center'
  },
  closeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: color.lightWhite
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingBottom: 10,
    borderBottomColor: color.divider,
    borderBottomWidth: 1
  },
  headerText: {
    flex: 1,
    marginRight: 50,
    textAlign: 'center',
    color: color.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  closeIcon: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    fontSize: 40,
    color: color.white,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})

export default Modal
