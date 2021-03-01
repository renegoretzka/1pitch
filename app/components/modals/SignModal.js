import React, { useEffect, useState } from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'

import { API, Storage } from 'aws-amplify'
import { getUserByEmail } from '../../../graphql/Custom/user.queries'

import { useUser } from '../../context/User'
import { useModals } from '../../context/Modals'

import Modal from '../../context/Modals/Modal'
import LoginModal from './LoginModal'
import UserConfirmationModal from './UserConfirmationModal'

import TextInputWrapper from '../ui/TextInputWrapper'
import SubmitButton from '../ui/SubmitButton'
import Divider from '../ui/Divider'

import { color } from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'

const SignModal = ({ navigation }) => {
  const { userExist } = useUser()
  const { modalIsShown, showModal, hideAllModals } = useModals()

  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [userData, setUserData] = useState({})

  const [loading, setLoading] = useState(false)

  /*
  useEffect(() => {
    if (modalIsShown('Sign')) {
      setErrorMessage('')
      setEmail('rene@renka.de')
    }
  }, [modalIsShown('Sign')])
  */

  const handleUserLoginModal = async () => {
    // TODO: move this to userExists and return with the user object to prevent unneccessary api calls
    try {
      setLoading(true)
      const user = await API.graphql({
        query: getUserByEmail,
        variables: {
          email: email
        },
        authMode: 'AWS_IAM'
      })
      let avatarURI
      if (user.data.getUserByEmail.avatar?.key) {
        avatarURI = await Storage.get(user.data.getUserByEmail.avatar.key)
      }
      setUserData({ ...user.data.getUserByEmail, avatarURI })
      setLoading(false)
      showModal('Login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserConfirmationModal = () => {
    showModal('UserConfirmation')
  }

  const handleEmailSubmit = async () => {
    try {
      setLoading(true)
      const userExists = await userExist({ username: email })
      switch (userExists.code) {
        case 'UserNotFoundException':
          hideAllModals()
          navigation.push('Register', { email: email })
          break
        case 'AliasExistsException':
          handleUserLoginModal()
          break
        case 'NotAuthorizedException':
          handleUserLoginModal()
          break
        case 'CodeMismatchException':
          handleUserConfirmationModal()
          break
        case 'ExpiredCodeException':
          handleUserConfirmationModal()
          break
        case 'LimitExceededException':
          setErrorMessage('Attempt limit exceeded, please try after some time.')
          break
        default:
          console.log('error from handleEmailSubmit', userExists)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('HandleEmailSubmit Error: ', error)
    }
  }

  return (
    <>
      <Modal
        name="Sign"
        header="Login or register"
        spacing={80}
        navigation={navigation}
        hideNavigation={true}
      >
        <ScrollView style={styles.signContainer}>
          <View style={styles.form}>
            <TextInputWrapper
              state={email}
              setState={setEmail}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              placeholder="E-Mail address"
              autoCompleteType="email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInput}
            />
            <SubmitButton
              onPress={handleEmailSubmit}
              value="Continue"
              style={styles.formButton}
              loading={loading}
            />
          </View>
          <Divider text="or" />
          <View style={styles.socialLogins}>
            <TouchableHighlight>
              <View style={styles.socialButton}>
                <Ionicons
                  name="logo-facebook"
                  style={styles.socialButtonIcon}
                />
                <Text style={styles.socialButtonText}>
                  Continue with Facebook
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.socialButton}>
                <Ionicons name="logo-google" style={styles.socialButtonIcon} />
                <Text style={styles.socialButtonText}>
                  Continue with Google
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Modal>
      <LoginModal userData={userData} navigation={navigation} />
      <UserConfirmationModal email={email} navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  signContainer: {},
  form: {
    marginTop: 20,
    marginBottom: 20
  },
  socialLogins: {
    marginTop: 20
  },
  socialButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.white,
    marginBottom: 20
  },
  socialButtonIcon: {
    width: 40,
    paddingLeft: 10,
    fontSize: 30,
    color: color.white
  },
  socialButtonText: {
    flex: 1,
    paddingRight: 40,
    textAlign: 'center',
    color: color.white,
    fontSize: 20,
    fontWeight: '500'
  }
})

export default SignModal
