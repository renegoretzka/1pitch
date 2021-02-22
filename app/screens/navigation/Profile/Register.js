import React, { useState, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { useUser } from '../../../context/User'
import { useModals } from '../../../context/Modals'
import { useNotification } from '../../../context/Notifications'

import UserConfirmationModal from '../../../components/modals/UserConfirmationModal'

import TextInputWrapper from '../../../components/ui/TextInputWrapper'
import SubmitButton from '../../../components/ui/SubmitButton'

import { color } from '../../../styles/colors'
import {
  safeArea,
  scrollContainer,
  textInfo,
  textLink,
  textNormal
} from '../../../styles/containers'
import {
  SPACING_BETWEEN,
  SPACING_BETWEEN_SMALL
} from '../../../styles/variables'
import { Ionicons } from '@expo/vector-icons'

const Register = ({ navigation, route }) => {
  const { register } = useUser()
  const { showModal } = useModals()
  const { pushNotification } = useNotification()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)
  const [email, setEmail] = useState(route.params?.email)
  const [emailEditable] = useState(route.params?.email ? false : true)
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const alreadyRegisteredIcon = () => (
    <Ionicons name="md-warning" size={30} color="white" />
  )

  const handleSignUp = async () => {
    try {
      setLoading(true)
      const AWSbirthdate = format(birthdate, 'MM/dd/yyyy')
      await register({
        username: email,
        password: password,
        attributes: {
          email: email,
          given_name: firstname,
          family_name: lastname
        }
      })
      setLoading(false)
      showModal('UserConfirmation')
    } catch (error) {
      setLoading(false)
      if (error.message === 'USER_ALREADY_REGISTERED') {
        pushNotification({
          text: `User already registered with the email ${email}, please login instead.`,
          icon: alreadyRegisteredIcon
        })
        navigation.goBack()
      } else {
        console.log('Error from handleSignUp:', error)
      }
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const stackNavigator = navigation.dangerouslyGetParent()
      stackNavigator.setOptions({ tabBarVisible: false })
    })
    return unsubscribe
  }, [navigation])
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const stackNavigator = navigation.dangerouslyGetParent()
      stackNavigator.setOptions({ tabBarVisible: true })
    })
    return unsubscribe
  }, [navigation])

  return (
    <>
      <SafeAreaView style={safeArea}>
        <ScrollView style={scrollContainer} contentInset={{ bottom: 85 }}>
          <TextInputWrapper
            state={firstname}
            setState={setFirstname}
            placeholder="Firstname"
            autoCompleteType="name"
            autoCorrect={false}
            autoCapitalize="words"
            secureTextEntry={false}
            textContentType="givenName"
            style={styles.inputSpacing}
          />
          <TextInputWrapper
            state={lastname}
            setState={setLastname}
            placeholder="Lastname"
            autoCompleteType="name"
            autoCorrect={false}
            autoCapitalize="words"
            secureTextEntry={false}
            textContentType="familyName"
            style={styles.inputSpacingSmall}
          />
          <TextInputWrapper
            state={email}
            setState={setEmail}
            placeholder="Email"
            autoCompleteType="email"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={false}
            editable={emailEditable}
            style={styles.inputSpacingSmall}
          />
          <Text style={[textInfo, styles.inputSpacing]}>
            We will send you an confirmation email to verify your email address.
          </Text>
          <TextInputWrapper
            state={password}
            setState={setPassword}
            placeholder="Password"
            autoCompleteType="password"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="familyName"
            style={styles.inputSpacing}
          />
          <View style={styles.flexRow}>
            <Text style={textNormal}>
              When pressing "Accept and continue", you are accepting the terms
              of REPLAY:
            </Text>
            <Text style={textLink}>Terms of use</Text>
            <Text style={textNormal}>, </Text>
            <Text style={textLink}>Protection of data privacy</Text>
            <Text style={textNormal}>, </Text>
            <Text style={textLink}>Conditions of payment</Text>
          </View>
          <SubmitButton
            onPress={handleSignUp}
            value="Accept and continue"
            loading={loading}
            style={styles.inputSpacing}
          />
        </ScrollView>
      </SafeAreaView>
      <UserConfirmationModal
        name="UserConfirmation"
        email={email}
        navigation={navigation}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING_BETWEEN
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inputSpacing: {
    marginBottom: SPACING_BETWEEN
  },
  inputSpacingSmall: {
    marginBottom: SPACING_BETWEEN_SMALL
  },
  datePickerContainer: {
    marginTop: SPACING_BETWEEN,
    flexDirection: 'row',
    backgroundColor: color.accent,
    borderRadius: 10,
    height: 50,
    alignItems: 'center'
  },
  datePicker: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 15,
    color: color.white,
    textAlignVertical: 'center'
  },
  dropIcon: {
    padding: 10,
    fontSize: 30,
    color: color.white
  }
})

export default Register
