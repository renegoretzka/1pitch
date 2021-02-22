import React from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native'

import Logo from '../../components/ui/Logo'

import { color } from '../../styles/colors'
import { safeArea, scrollContainer } from '../../styles/containers'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={color.background} />
      <ScrollView style={scrollContainer} contentInset={{ bottom: 85 }}>
        <View style={styles.header}>
          <Logo />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
})

export default Home
