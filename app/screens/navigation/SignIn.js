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
            <ScrollView
              style={[scrollContainer, styles.scrollview]}
              contentInset={{ bottom: 85 }}
            >
              <Logo />
              <Text style={textNormal}>The 1-Minute Pitch for Startups</Text>
              <Text style={[styles.header, textHeader]}>Welcome to 1Pitch</Text>
              <SubmitButton onPress={() => showModal('Sign')} value="Sign in" />
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
            </ScrollView>
          </SafeAreaView>
          <SignModal navigation={navigation} hideNavigation={true} />
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    marginTop: 10
  },
  header: {
    marginBottom: 15
  },
  register: {
    flexDirection: 'row',
    marginTop: 20
  },
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

export default SignIn
