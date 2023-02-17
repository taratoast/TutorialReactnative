import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Second = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.lightText}>This is Second</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: '#FFF',
  }
});

export {Second};