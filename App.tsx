import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import Navigator from './src/navigation'

const App = () => 
   <SafeAreaView style={styles.container}>
    <Navigator />
  </SafeAreaView>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default App
