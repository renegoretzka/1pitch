import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { API, Auth, Hub, Storage } from 'aws-amplify'
import {
  forgotPassword,
  forgotPasswordConfirmation,
  resendConfirmation,
  signIn,
  signOut,
  signUp,
  signUpConfirmation,
  userExists
} from './User/index'
import { getUserAuthenticated } from '../../graphql/Custom/user.queries'
import { updatedUserAuthenticated } from '../../graphql/Custom/user.subscriptions'
import { Asset } from 'expo-asset'

const profilePlaceholderURI = Asset.fromModule(
  require('../assets/profile_placeholder.png')
).uri

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const currentUser = async () => {
    try {
      setLoading(true)
      let user = await Auth.currentAuthenticatedUser()
      setUserFromDatabase(user.attributes.sub)
    } catch (error) {
      setLoading(false)
      setUser({})
    }
  }

  const setUserFromDatabase = async (id) => {
    try {
      let result = await API.graphql({
        query: getUserAuthenticated,
        variables: { id: id }
      })
      if (result.data.getUser.avatar?.key) {
        const avatarUri = await Storage.get(result.data.getUser.avatar.key)
        result.data.getUser.avatar = avatarUri
      } else {
        result.data.getUser.avatar = profilePlaceholderURI
      }
      setUser({ ...result.data.getUser })
      setLoading(false)
    } catch (error) {
      console.log('Error from setUserFromDatabase', error)
    }
  }

  const authListener = ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        setLoading(true)
        setUserFromDatabase(data.attributes.sub)
        break
      case 'signOut':
        setUser({})
        break
    }
  }

  useEffect(() => {
    currentUser()
    Hub.listen('auth', authListener)
    return () => Hub.remove('auth', authListener)
  }, [])

  useEffect(() => {
    let subscription = null
    if (user.id && !subscription) {
      subscription = API.graphql({
        query: updatedUserAuthenticated,
        variables: { id: user.id }
      }).subscribe({
        next: async ({ value }) => {
          let result = value.data.updatedUser
          if (result.avatar?.key) {
            const avatarUri = await Storage.get(result.avatar.key)
            result.avatar = avatarUri
          } else {
            result.avatar = profilePlaceholderURI
          }
          setUser({ ...user, result })
        }
      })
      return () => subscription.unsubscribe()
    }
  }, [user])

  const values = useMemo(() => {
    return {
      user: user,
      userIsLoading: loading,
      register: signUp,
      login: signIn,
      logout: signOut,
      signUpConfirmation: signUpConfirmation,
      resendConfirmation: resendConfirmation,
      forgotPassword: forgotPassword,
      confirmForgotPassword: forgotPasswordConfirmation,
      userExist: userExists
    }
  }, [user, loading])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = useContext(UserContext)
  return context
}

export { useUser, UserContext, UserProvider }
