import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useReducer,
  useState
} from 'react'
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable
} from 'react-native'
import * as mime from 'react-native-mime-types'

import { API, Storage } from 'aws-amplify'
import { updateUser } from '../../../../graphql/mutations'

import config from '../../../../aws-exports'
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

import { useUser } from '../../../context/User'
import { useNotification } from '../../../context/Notifications'
import useBehindKeyboard from '../../../context/InputBehindKeyboard'

import formReducer from './UpdateProfile.reducer'

import { nanoid } from 'nanoid'
import SubCategory from '../../../components/ui/SubCategory'

import { color } from '../../../styles/colors'
import {
  scrollContainer,
  safeArea,
  textNormal,
  textNormalBigger,
  textInput,
  textInputMulti,
  userAvatar
} from '../../../styles/containers'
import {
  SPACING_BETWEEN,
  SPACING_BETWEEN_SMALL
} from '../../../styles/variables'

import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const UpdateProfile = ({ navigation, route }) => {
  const { user } = useUser()
  const { pushNotification } = useNotification()
  const { keyboardPosition, handleInputBehindKeyboard } = useBehindKeyboard()

  const avatarPlaceholder = Image.resolveAssetSource(
    require('../../../assets/profilbild.jpg')
  ).uri

  const initialFormState = {
    about: user.bio,
    firstname: user.firstname,
    lastname: user.lastname,
    location: user.location,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar ? user.avatar : avatarPlaceholder,
    edited: false
  }

  useEffect(() => {
    if (route.params?.image) {
      handleInputChange('avatar', route.params.image.uri)
    }
  }, [route.params?.image])

  const [formState, dispatch] = useReducer(formReducer, initialFormState)
  const handleInputChange = (name, value) => {
    dispatch({
      type: 'HANDLE_EDIT',
      field: name,
      payload: value
    })
  }

  const SuccessIcon = () => (
    <Ionicons name="ios-checkmark-circle-outline" size={30} color="white" />
  )
  const saveProfile = useCallback(async () => {
    try {
      let input = {
        id: user.id,
        firstname: formState.firstname,
        lastname: formState.lastname,
        location: formState.location,
        email: formState.email,
        phone: formState.phone,
        bio: formState.about
      }

      if (route.params?.image) {
        const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(formState.avatar)
        const mimeType = mime.lookup(formState.avatar)

        const key = `${user.id}/${nanoid()}${extension && '.'}${extension}`

        let file = {
          bucket,
          key,
          region
        }

        const image = await fetch(formState.avatar)
        const blob = await image.blob()

        await Storage.put(key, blob, {
          contentType: mimeType
        })

        input.avatar = file
      }

      await API.graphql({
        query: updateUser,
        variables: {
          input
        }
      })
      pushNotification({
        text: 'Your profile is successfully updated.',
        icon: SuccessIcon
      })
      dispatch({ type: 'RESET_EDITED' })
    } catch (error) {
      console.log('Error from saveProfile', error)
    }
  }, [formState])

  const SaveButton = () => (
    <Pressable onPress={() => saveProfile()} style={styles.saveButton}>
      <MaterialCommunityIcons
        name="content-save-edit"
        size={26}
        color={formState.edited ? color.primary : color.white}
        style={styles.saveButtonIcon}
      />
    </Pressable>
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: SaveButton
    })
  }, [navigation, saveProfile])

  return (
    <>
      <SafeAreaView style={safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={color.background}
        />
        <Animated.ScrollView
          style={[
            scrollContainer,
            styles.scrollview,
            {
              transform: [{ translateY: keyboardPosition }]
            }
          ]}
          contentInset={{ bottom: 95 }}
        >
          <Pressable
            onPress={() => {
              navigation.push('UpdateAvatar')
            }}
            style={[
              styles.row,
              styles.centerY,
              { marginBottom: SPACING_BETWEEN }
            ]}
          >
            <Image style={userAvatar} source={{ uri: formState.avatar }} />
            <Feather
              name="upload"
              style={{ fontSize: 28, marginRight: SPACING_BETWEEN_SMALL }}
              color="white"
            />
            <Text style={textNormalBigger}>Upload photo</Text>
          </Pressable>
          <View style={styles.flex}>
            <TextInput
              value={formState.about}
              onChangeText={(value) => handleInputChange('about', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Tell a little bit about yourself"
              autoCorrect={true}
              multiline={true}
              numberOfLines={2}
              style={[textInput, textInputMulti, styles.about]}
            />
            <SubCategory text="Your name" style={styles.subCategory} />
            <TextInput
              value={formState.firstname}
              onChangeText={(value) => handleInputChange('firstname', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Firstname"
              autoCompleteType="name"
              autoCorrect={false}
              autoCapitalize="words"
              secureTextEntry={false}
              textContentType="givenName"
              style={[textInput, styles.input]}
            />
            <TextInput
              value={formState.lastname}
              onChangeText={(value) => handleInputChange('lastname', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Lastname"
              autoCompleteType="name"
              autoCorrect={false}
              autoCapitalize="words"
              secureTextEntry={false}
              textContentType="familyName"
              style={[textInput, styles.input]}
            />
            <SubCategory
              text="Contact information"
              style={styles.subCategory}
            />
            <Text style={[textNormal, styles.inputDescription]}>Location</Text>
            <TextInput
              value={formState.location}
              onChangeText={(value) => handleInputChange('location', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Location"
              autoCorrect={true}
              secureTextEntry={false}
              textContentType="location"
              style={[textInput, styles.input]}
            />
            <Text style={[textNormal, styles.inputDescription]}>E-Mail</Text>
            <TextInput
              value={formState.email}
              onChangeText={(value) => handleInputChange('email', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Email"
              autoCompleteType="email"
              autoCorrect={false}
              autoCapitalize="none"
              style={[textInput, styles.input]}
            />
            <Text style={[textNormal, styles.inputDescription]}>Phone</Text>
            <TextInput
              value={formState.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              onFocus={(e) => {
                handleInputBehindKeyboard(e)
              }}
              placeholder="Phone"
              autoCompleteType="tel"
              textContentType="telephoneNumber"
              style={[textInput, styles.input]}
            />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    paddingTop: 20
  },
  header: {
    marginBottom: 15
  },
  saveButton: {
    marginRight: SPACING_BETWEEN
  },
  row: {
    flexDirection: 'row'
  },
  centerY: {
    alignItems: 'center'
  },
  centerX: {
    justifyContent: 'center'
  },
  flex: {
    flex: 1
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  about: {
    height: 80
  },
  input: {
    marginBottom: 10
  },
  inputDescription: {
    marginBottom: 5,
    marginLeft: 5
  },
  subCategory: {
    marginLeft: 5,
    marginBottom: 10
  },
  dropIcon: {
    padding: 10,
    fontSize: 30,
    color: color.white
  }
})

export default UpdateProfile
