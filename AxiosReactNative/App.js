import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HttpClient } from './service/HttpClient'
import { HOST, PORT } from './service/Global'

import { getToken } from './service/TokenService'
import { ApiRole } from './service/ApiService'

const App = () => {
  //useEffect คือ การทำงาน เกิดขึ้น ก่อนโหลด หน้าปัจจุบันเสร็จ
  useEffect(() => {
    fetchToken();
    getRole();
  }, [])

  const fetchToken = async () => {
    const result = await getToken('duongjai@double-p.co.th', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342');

    //AsyncStorage เก็บข้อมูลชั่วคราว
    await AsyncStorage.setItem('token', result);
    console.log('ResultToken: ', result);
  }

  const getRole = async () => {

    // ###### Method POST ######
    //var json = {
    //   email:'',
    //   password:''
    // };
    // HttpClient(HOST, PORT).post(ApiDepartment.getDepartment,json)

    // ## If you do not want to enter data
    // HttpClient(HOST, PORT).post(ApiDepartment.getDepartment,{})


    //Method GET
    //HttpClient(HOST, PORT).get(ApiDepartment.getDepartment,json)

    var json = {
      "flagdelete": "N",
      "flagactive": "",
      "rowoffset": 1,
      "rowfetch": 15
    }
    HttpClient(HOST, PORT).post(ApiRole.getRole, json).then(response => {
      console.log('Role:', response.data)
    })
  }

  return (
    <View>
      <Text style={styles.container}>TEST API</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})