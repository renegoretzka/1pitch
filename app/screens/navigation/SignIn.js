import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable
} from 'react-native'

import { useModals } from '../../context/Modals'

import Logo from '../../components/ui/Logo'
import SubmitButton from '../../components/ui/SubmitButton'

import { color } from '../../styles/colors'
import {
  textHeader,
  textNormal,
  textLink,
  scrollContainer,
  safeArea
} from '../../styles/containers'
import SignModal from '../../components/modals/SignModal'
import { useUser } from '../../context/User'
import Loading from './Loading'

const SignIn = ({ navigation }) => {
  const { showModal } = useModals()
  const { userIsLoading } = useUser()

  return (
    <>
      {userIsLoading ? (
        <Loading />
      ) : (
        <>
          <SafeAreaView style={safeArea}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={color.background}
            />
            <View style={[styles.container, scrollContainer]}>
              <View style={styles.headerContainer}>
                <Logo />
                <Text style={textNormal}>The 1-Minute Pitch for Startups</Text>
                <Text style={[styles.header]}>Welcome to 1Pitch</Text>
              </View>
              <View style={styles.signContainer}>
                <SubmitButton
                  onPress={() => showModal('Sign')}
                  value="Sign in"
                />
                <View style={styles.register}>
                  <Text style={textNormal}>You have not account yet? </Text>
                  <Pressable
                    onPress={() => {
                      showModal('Sign')
                    }}
                  >
                    <Text style={textLink}>Sign up</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </SafeAreaView>
          <SignModal navigation={navigation} hideNavigation={true} />
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: color.background,
    paddingBottom: 60
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    color: color.white,
    fontSize: 42,
    marginTop: 30
  },
  signContainer: {
    flex: 0.3
  },
  register: {
    flexDirection: 'row',
    marginTop: 20
  },
  loading: {
    marginTop: 40,
    fontSize: 30,
    color: color.white
  }
})

export default SignIn
