import { API } from 'aws-amplify'

import { getUser } from '../../../graphql/queries'

import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Button
} from 'react-native'

import { useUser } from '../../context/User'

import SubCategory from '../../components/ui/SubCategory'
import ItemButtonIcon from '../../components/ui/ItemButtonIcon'
import NotificationItem from '../../components/ui/NotificationItem'
import Divider from '../../components/ui/Divider'

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
import { AntDesign } from '@expo/vector-icons'

const Profile = ({ navigation }) => {
  const { user, logout } = useUser()

  // TODO: Test registration (birthday)

  return (
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
          <View style={styles.userInfo}>
            <Image style={userAvatar} source={{ uri: user.avatar }} />
            <View style={styles.userInfoRight}>
              <Text style={textHeader}>{user.firstname}</Text>
              <Text style={textNormal}>{user.email}</Text>
            </View>
          </View>

          <View>
            <SubCategory text="Notifications" />
            <View style={styles.notificationContainer}>
              <NotificationItem />
              <Divider
                style={{
                  marginBottom: SPACING_BETWEEN_SMALL,
                  marginTop: SPACING_BETWEEN_SMALL
                }}
              />
              <NotificationItem />
              <Divider
                style={{
                  marginBottom: SPACING_BETWEEN_SMALL,
                  marginTop: SPACING_BETWEEN_SMALL
                }}
              />
              <NotificationItem />
              <Pressable style={styles.notificationShowAll}>
                <Text style={styles.notificationShowAllText}>Show all</Text>
              </Pressable>
            </View>

            <SubCategory text="Profile settings" />
            <ItemButtonIcon onPress={() => navigation.push('UpdateProfile')}>
              <Text style={textNormal}>Update profile information</Text>
              <FontAwesome5 name="user-cog" size={24} color={color.white} />
            </ItemButtonIcon>
            <ItemButtonIcon>
              <Text style={textNormal}>Payment methods</Text>
              <MaterialIcons name="payment" size={34} color={color.white} />
            </ItemButtonIcon>
            <ItemButtonIcon>
              <Text style={textNormal}>Notifications settings</Text>
              <MaterialIcons
                name="notifications"
                size={30}
                color={color.white}
              />
            </ItemButtonIcon>

            <SubCategory text="Recommendations and balance" />
            <ItemButtonIcon info="Support us and spread the word to make REPLAY more popular.">
              <Text style={textNormal}>Invite your friends</Text>
              <AntDesign name="gift" size={30} color={color.white} />
            </ItemButtonIcon>

            <SubCategory text="Support" />
            <ItemButtonIcon>
              <Text style={textNormal}>Receive assistance</Text>
              <FontAwesome5
                name="hands-helping"
                size={24}
                color={color.white}
              />
            </ItemButtonIcon>
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
  userInfo: {
    flexDirection: 'row'
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
