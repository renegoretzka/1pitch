import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image
} from 'react-native'

import { API, Storage } from 'aws-amplify'

import { useModals } from '../../context/Modals'

import Modal from '../../context/Modals/Modal'
import SubmitButton from '../ui/SubmitButton'

import { color } from '../../styles/colors'
import {
  inputError,
  textHeader,
  textInput,
  textNormal,
  textNormalBigger,
  userAvatar
} from '../../styles/containers'
import { createTeamUserLink } from '../../../graphql/mutations'
import { getUserByEmail } from '../../../graphql/Custom/user.queries'

const AddTeamMemberModal = ({ currentMembers, teamID, navigation }) => {
  const { modalIsShown, hideAllModals } = useModals()
  const [member, setMember] = useState({})
  const [loading, setLoading] = useState(false)

  const searchMember = async () => {
    try {
      if (member.email) {
        const foundMember = await API.graphql({
          query: getUserByEmail,
          variables: {
            email: member?.email
          }
        })
        let avatarURI
        if (foundMember.data.getUserByEmail) {
          if (foundMember.data.getUserByEmail.avatar) {
            avatarURI = await Storage.get(
              foundMember.data.getUserByEmail.avatar.key
            )
          }
          const alreadyMember = currentMembers.some(
            (memberItem) =>
              memberItem.user.id === foundMember.data.getUserByEmail.id
          )

          setMember({
            ...member,
            ...foundMember.data.getUserByEmail,
            avatarURI,
            alreadyMember
          })
        } else {
          setMember({ ...member, notFound: true })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addMember = async () => {
    try {
      setLoading(true)
      await API.graphql({
        query: createTeamUserLink,
        variables: {
          input: {
            userID: member.id,
            teamID: teamID,
            admin: member.admin,
            role: member.role
          }
        }
      })
      setLoading(false)
      hideAllModals()
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (modalIsShown('AddMember')) {
      setMember({})
    }
  }, [modalIsShown('AddMember')])

  return (
    <>
      <Modal
        name="AddMember"
        header="Add new member"
        spacing={200}
        navigation={navigation}
        hideNavigation={true}
      >
        <ScrollView>
          <View style={styles.form}>
            {!member.firstname && (
              <>
                <Text style={textNormal}>
                  Please enter the email address of the new member
                </Text>
                <TextInput
                  value={member.email}
                  onChangeText={(value) =>
                    setMember({ ...member, email: value })
                  }
                  placeholder="Email address"
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={[textInput, styles.input]}
                />
                {member.notFound && (
                  <Text style={[inputError]}>
                    The user is not registered on 1Pitch yet. Please ask for
                    registration.
                  </Text>
                )}
                <SubmitButton
                  onPress={searchMember}
                  value="Find member"
                  loading={loading}
                />
              </>
            )}
            {member.firstname && (
              <>
                <View style={styles.center}>
                  {member.avatarURI && (
                    <Image
                      style={userAvatar}
                      source={{ uri: member.avatarURI }}
                    />
                  )}
                  <Text style={textHeader}>
                    {member.firstname} {member.lastname}
                  </Text>
                </View>
                {!member.alreadyMember ? (
                  <>
                    <TextInput
                      value={member?.role}
                      onChangeText={(value) =>
                        setMember({ ...member, role: value })
                      }
                      placeholder="Role in your team"
                      textContentType="emailAddress"
                      keyboardAppearance="dark"
                      autoCapitalize="none"
                      style={[textInput, styles.input]}
                    />
                    <Pressable
                      style={styles.checkBoxButton}
                      onPress={() => {
                        setMember({ ...member, admin: !member.admin })
                      }}
                    >
                      <View style={styles.checkBox}>
                        <View
                          style={[
                            styles.checkBoxInner,
                            {
                              backgroundColor: member.admin
                                ? color.primary
                                : color.white
                            }
                          ]}
                        />
                      </View>
                      <Text style={textNormalBigger}>Admin privileges</Text>
                    </Pressable>
                    <SubmitButton
                      onPress={addMember}
                      value={'Add to team'}
                      loading={loading}
                    />
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color: color.white,
                        marginTop: 26,
                        fontSize: 24,
                        alignSelf: 'center'
                      }}
                    >
                      That person is already member
                    </Text>
                    <SubmitButton onPress={hideAllModals} value={'Close'} />
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  form: {
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    marginTop: 20
  },
  checkBoxButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  checkBox: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxInner: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
})

export default AddTeamMemberModal
