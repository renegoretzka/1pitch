import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView
} from 'react-native'

import { API } from 'aws-amplify'

import { useModals } from '../../context/Modals'

import Modal from '../../context/Modals/Modal'
import SubmitButton from '../ui/SubmitButton'

import { color } from '../../styles/colors'
import {
  textHeader,
  textInput,
  textNormalBigger
} from '../../styles/containers'
import { updateTeamUserLink } from '../../../graphql/Custom/user.mutations'

const EditTeamMemberModal = ({ memberData, navigation }) => {
  const { modalIsShown, hideAllModals } = useModals()
  const [member, setMember] = useState()
  const [loading, setLoading] = useState(false)

  const saveMember = async () => {
    try {
      setLoading(true)
      await API.graphql({
        query: updateTeamUserLink,
        variables: {
          input: {
            id: member.id,
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
    if (modalIsShown('EditMember')) {
      setMember(memberData)
    }
  }, [modalIsShown('EditMember')])

  return (
    <>
      <Modal
        name="EditMember"
        header="Member settings"
        spacing={200}
        navigation={navigation}
        hideNavigation={true}
      >
        <ScrollView>
          <View style={styles.form}>
            <Text style={textHeader}>
              {member?.user?.firstname} {member?.user?.lastname}
            </Text>
            <TextInput
              value={member?.role}
              onChangeText={(value) => setMember({ ...member, role: value })}
              placeholder="Role in your team"
              keyboardAppearance="dark"
              style={[textInput, styles.input]}
            />
            <Pressable
              style={styles.checkBoxButton}
              onPress={() => {
                setMember({ ...member, admin: !member?.admin })
              }}
            >
              <View style={styles.checkBox}>
                <View
                  style={[
                    styles.checkBoxInner,
                    {
                      backgroundColor: member?.admin
                        ? color.primary
                        : color.white
                    }
                  ]}
                />
              </View>
              <Text style={textNormalBigger}>Admin privileges</Text>
            </Pressable>
            <SubmitButton onPress={saveMember} value="Save" loading={loading} />
          </View>
        </ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
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

export default EditTeamMemberModal
