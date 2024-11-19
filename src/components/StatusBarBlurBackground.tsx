import React from 'react'
import { StyleSheet, View } from 'react-native'

export const StatusBarBlurBackground = (): React.ReactElement => (
  <View style={styles.container} />
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})
