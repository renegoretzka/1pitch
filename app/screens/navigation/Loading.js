import React from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable
} from 'react-native'
import Logo from '../../components/ui/Logo'
import { useUser } from '../../context/User'

import { color } from '../../styles/colors'
import { safeArea } from '../../styles/containers'

const Loading = () => {
  const { logout } = useUser()
  return (
    <SafeAreaView style={[safeArea, styles.container]}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <View style={styles.container}>
        <Logo />
        <Text style={styles.loading}>Loading...</Text>
        <Pressable onPress={() => logout()}>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
    paddingBottom: 60
  },
  loading: {
    marginTop: 40,
    fontSize: 30,
    color: color.white
  }
})

export default Loading
