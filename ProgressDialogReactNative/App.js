import { Modal, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useState} from 'react'

const App = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      visible={modalVisible}>
      <View style={{ flex: 1, backgroundColor: "#00000020", justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" }}>
          <Text style={styles.progressHeader}>Loading...</Text>
          <ActivityIndicator size="large" color="#f35588" />
        </View>
      </View>
    </Modal>
  )
}

export default App

const styles = StyleSheet.create({
  progressHeader: {
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})