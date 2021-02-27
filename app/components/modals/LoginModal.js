import React, { useEffect, useState } from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable
} from 'react-native'

import { useUser } from '../../context/User'
import { useNotification } from '../../context/Notifications'
import { useModals } from '../../context/Modals'

import Modal from '../../context/Modals/Modal'
import ForgotPasswordModal from './ForgotPasswordModal'

import TextInputWrapper from '../ui/TextInputWrapper'
import SubmitButton from '../ui/SubmitButton'
import Divider from '../ui/Divider'

import { color } from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'
import { textLink, textNormal } from '../../styles/containers'

const LoginModal = ({ userData, navigation }) => {
  const { login, logout, forgotPassword } = useUser()
  const { pushNotification } = useNotification()
  const { modalIsShown, showModal, hideAllModals } = useModals()

  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const avatarPlaceholder = Image.resolveAssetSource(
    require('../../assets/profile_placeholder.png')
  ).uri

  useEffect(() => {
    if (modalIsShown('Login')) {
      setErrorMessage('')
      setPassword('')
    }
  }, [modalIsShown('Login')])

  const handleSignInSubmit = async () => {
    try {
      setLoading(true)
      const user = await login({
        username: userData.email,
        password: password
      })
      setLoading(false)
      if (user.attributes) {
        hideAllModals()
      }
    } catch (error) {
      setLoading(false)
      if (error.message === 'AUTHORIZATION_ERROR') {
        setErrorMessage('Your entered password is invalid.')
      } else {
        console.log('Error from handleSignInSubmit', error)
      }
    }
  }

  const ResetPasswordIcon = () => (
    <Ionicons name="ios-send" size={30} color="white" />
  )

  const handleResetPassword = async () => {
    try {
      const forgotPasswordSuccess = await forgotPassword({
        username: userData.email
      })
      if (forgotPasswordSuccess) {
        pushNotification({
          text: `A confirmation code has been send to ${userData.email} to set a new password.`,
          icon: ResetPasswordIcon
        })
        showModal('ForgotPassword')
      }
    } catch (error) {
      if (error.message === 'LIMIT_EXCEEDED') {
        setErrorMessage('Attempt limit exceeded, please try after some time.')
      } else {
        console.log('Error from handleResetPassword', error)
      }
    }
  }

  return (
    <>
      <Modal
        name="Login"
        header="Account already exists"
        spacing={150}
        navigation={navigation}
      >
        <ScrollView style={styles.content}>
          <Text style={styles.text}>
            Looks like you already have an account. Please login instead.
          </Text>
          <View style={styles.userInfo}>
            <Image
              style={styles.userInfoAvatar}
              source={{
                uri: userData.avatarURI ? userData.avatarURI : avatarPlaceholder
              }}
            />
            <Text style={styles.userInfoText}>{userData.firstname}</Text>
            <Text style={styles.userInfoText}>{userData.email}</Text>
          </View>
          <View style={styles.form}>
            <TextInputWrapper
              state={password}
              setState={setPassword}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              placeholder="Password"
              autoCompleteType="password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.textInput}
            />
            <Pressable onPress={handleResetPassword} style={styles.row}>
              <Text style={textNormal}>Forgot password?</Text>
              <Text style={textLink}> Click here to resend it.</Text>
            </Pressable>
            <SubmitButton
              onPress={() => {
                handleSignInSubmit()
              }}
              value="Continue"
              loading={loading}
              style={styles.formButton}
            />
          </View>
        </ScrollView>
      </Modal>
      <ForgotPasswordModal email={userData.email} navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10
  },
  userInfo: {
    alignItems: 'center'
  },
  userInfoAvatar: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 60,
    marginBottom: 10
  },
  userInfoText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    color: color.white,
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center'
  },
  form: {
    marginBottom: 20
  },
  textInput: {
    marginTop: 20
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

export default LoginModal
