// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { HttpClient } from './service/HttpClient'
import { HOST, PORT } from './service/Global'

import { getToken } from './service/TokenService'
import { ApiEmployee } from './service/ApiService'


// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const App = () => {
  const [employee,setEmployee] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {

    fetchToken();
    getEmployee().then(()=>{
      setFilteredDataSource(employee);
      setMasterDataSource(employee);
    }).catch((error) => {
         console.error(error);
    });

  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    // Binded with TextInput OnChangeText
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.employeeFullname
          ? item.employeeFullname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      //newData is filtered
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const fetchToken = async () => {
    const result = await getToken('duongjai@double-p.co.th', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342');

    //AsyncStorage เก็บข้อมูลชั่วคราว
    await AsyncStorage.setItem('token', result);
    console.log('ResultToken: ', result);
  }

  const getEmployee = async () => {

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
      //"rowoffset": 1,
      //"rowfetch": 15
    }
    HttpClient(HOST, PORT).post(ApiEmployee.getEmployee, json).then(response => {
      //console.log('Emp:', response.data)
      setEmployee(response.data)
    })
  }

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.employeeCode}
        {'.'}
        {item.employeeFullname.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.employeeCode + '\nTitle : ' + item.employeeFullname);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
