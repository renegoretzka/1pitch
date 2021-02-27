import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { color } from '../../styles/colors'
import { FONT_SIZE_INFO, SPACING_BETWEEN } from '../../styles/variables'

const ItemButtonIcon = ({ onPress, children, info, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
      {info && <Text style={styles.info}>{info}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: color.divider,
    borderBottomWidth: 1
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 49
  },
  info: {
    color: color.white,
    marginBottom: SPACING_BETWEEN,
    marginRight: 50,
    fontSize: FONT_SIZE_INFO
  }
})

export default ItemButtonIcon
