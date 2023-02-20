import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.lightText}>This is Home</Text>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#550000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: '#FFF',
  }
})

export { Home };