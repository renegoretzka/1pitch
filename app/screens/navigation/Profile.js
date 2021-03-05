import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable
} from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

import { useUser } from '../../context/User'

import SignModal from '../../components/modals/SignModal'
import SubCategory from '../../components/ui/SubCategory'
import ItemButtonIcon from '../../components/ui/ItemButtonIcon'

import { color } from '../../styles/colors'
import {
  textHeader,
  textNormal,
  textLink,
  scrollContainer,
  safeArea,
  userAvatar
} from '../../styles/containers'
import {
  FONT_WEIGHT_BOLD,
  SPACING_BETWEEN,
  SPACING_BETWEEN_SMALL
} from '../../styles/variables'

import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const Profile = ({ navigation }) => {
  const { user, logout } = useUser()

  return (
    <>
      <SafeAreaView style={safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={color.background}
        />
        <ScrollView
          style={[
            scrollContainer,
            styles.scrollview,
            { maxHeight: useDimensions().window.height }
          ]}
          contentInset={{ bottom: 85 }}
        >
          <View style={styles.userInfo}>
            <View style={styles.row}>
              <Image style={userAvatar} source={{ uri: user.avatar }} />
              <View style={styles.userInfoRight}>
                <Text style={textHeader}>{user.firstname}</Text>
                <Text style={textNormal}>{user.email}</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.push('UpdateProfile')}>
              <FontAwesome5 name="user-cog" size={24} color={color.white} />
            </Pressable>
          </View>

          <View>
            <SubCategory text="Support" />
            <ItemButtonIcon>
              <Text style={textNormal}>Give us feedback</Text>
              <MaterialIcons name="feedback" size={26} color={color.white} />
            </ItemButtonIcon>

            <ItemButtonIcon
              onPress={() => {
                logout()
              }}
              style={{ marginTop: 20 }}
            >
              <Text style={textLink}>Logout</Text>
            </ItemButtonIcon>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SignModal navigation={navigation} hideNavigation={true} />
    </>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    marginTop: 10,
    paddingBottom: 105
  },
  header: {
    marginBottom: 15
  },
  register: {
    flexDirection: 'row',
    marginTop: 20
  },
  row: {
    flexDirection: 'row'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfoRight: {
    justifyContent: 'center'
  },
  notificationContainer: {
    marginTop: SPACING_BETWEEN
  },
  notificationShowAll: {
    alignItems: 'center',
    marginTop: SPACING_BETWEEN_SMALL
  },
  notificationShowAllText: {
    color: color.white,
    fontWeight: FONT_WEIGHT_BOLD
  }
})

export default Profile
