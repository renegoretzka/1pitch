import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext
} from 'react'
import { View, StyleSheet } from 'react-native'

import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import Notification from './Notifications/Notification'

const SPACING_TOP = 40
const FADE_DURATION_OUT = 100

const Notifications = () => {
  const { notifications, removeNotification, deletedItems } = useNotification()

  return (
    <View style={[styles.container]}>
      {notifications.map(({ text, icon, id }, index) => {
        return (
          <Notification
            text={text}
            icon={icon}
            id={id}
            key={id}
            index={index}
            remove={removeNotification}
            deletedItems={deletedItems.length}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    position: 'absolute',
    width: '100%',
    marginTop: SPACING_TOP
  }
})

const NotificationContext = createContext([])

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [deletedItems, setDeletedItems] = useState([])
  const [notificationsQueue, setNotificationsQueue] = useState([])
  const [notificationsQueueCount, setNotificationsQueueCount] = useState(0)

  useEffect(() => {
    setNotificationsQueueCount(notificationsQueue.length)
    if (notificationsQueueCount < notificationsQueue.length) {
      notificationsQueue.map((item, index) => {
        setTimeout(() => {
          setNotifications((prev) => [...prev, item])
        }, index * 1000)
      })
      setNotificationsQueue([])
    }
  }, [notificationsQueue])

  const pushNotification = ({ text, icon }) => {
    const id = nanoid()
    setNotificationsQueue((prev) => [
      ...prev,
      { id, text, icon, _deleted: false }
    ])
  }
  const removeNotification = (id) => {
    const itemIndex = notifications.findIndex(
      (notification) => notification.id === id
    )
    const updatedNotifications = [...notifications]
    updatedNotifications[itemIndex] = {
      ...notifications[itemIndex],
      _deleted: true
    }
    setNotifications(updatedNotifications)

    setDeletedItems([...deletedItems, notifications[itemIndex]])

    setTimeout(() => {
      setDeletedItems(
        deletedItems.filter((notification) => notification.id !== id)
      )
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      )
    }, FADE_DURATION_OUT)
  }

  const values = useMemo(
    () => ({
      notifications,
      pushNotification,
      removeNotification,
      deletedItems
    }),
    [notifications, deletedItems]
  )

  return (
    <NotificationContext.Provider value={values}>
      <Notifications />
      {children}
    </NotificationContext.Provider>
  )
}

const useNotification = () => {
  const context = useContext(NotificationContext)
  return context
}

export { useNotification, NotificationsProvider }
