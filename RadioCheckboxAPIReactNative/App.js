import React, { useState, useEffect } from 'react';
import { RadioButton, Checkbox, CheckboxGroup } from 'react-native-paper';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { HttpClient } from './service/HttpClient'
import { HOST, PORT } from './service/Global'
import { getToken } from './service/TokenService'
import { ApiDepartment, ApiEmployee, ApiJob } from './service/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [department,setDepartment] = useState([]);
  const [job, setJob] = useState([]);
  const [checked, setChecked] = useState('');
  const [employee, setEmployee] = useState([]);

  useEffect(() => {

    fetchToken();
    getDepartment();
    getJob();

  }, []);

  const fetchToken = async () => {
    const result = await getToken('duongjai@double-p.co.th', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342');
    await AsyncStorage.setItem('token', result);
    console.log('ResultToken: ', result);
  }


  const getEmployee = async () => {

    setEmployee([]);

    const a = job.filter((item) => item.checked == true).map(({id, key, checked}) => ({id, key, checked}));

    //console.log(a);

    a.forEach(element => {
      var json = {
        "FlagDelete": "N",
        "FlagActive": "Y",
        "DepartmentCode": checked,
        "JobCode": element.key.jobCode
      }

      HttpClient(HOST, PORT).post(ApiEmployee.getEmployee, json).then(response => {
        //console.log('Emp:', response.data)
        setEmployee((old)=>{
          if(response.data != null) {
            response.data.forEach(element => {
              old.push(element);
            });
          };
          return [...old];
        })
      })

      console.log('Emp:', employee)
    });
  }

  const getDepartment = async () => {

    var json = {
      "flagdelete": "N",
      "flagactive": "",
    }
    HttpClient(HOST, PORT).post(ApiDepartment.getDepartment, json).then(response => {
      //console.log('Dept:', response.data)
      setDepartment(response.data)
    })
  }

  const getJob = async () => {

    var json = {
      "flagdelete": "N",
      "flagactive": "",
    }
    HttpClient(HOST, PORT).post(ApiJob.getJob, json).then(response => {
      //console.log('Job:', response.data)

      let unformatted = response.data;
      let formatted = [];
      for(let i=0; i<unformatted.length;i++){
        //setJob(response.data)
        formatted.push(
          {
            id:i,
            key:unformatted[i],
            checked: false
          }
        );

      }

      setJob(formatted);
    })
  }

  const ItemRadioView = ({ item }) => {
    return (

      <View style={[styles.radioView]}>
        <RadioButton
          style={styles.itemStyle}
          value={item.departmentCode}
          label={item.departmentName}
          status={checked === item.departmentCode ? 'checked' : 'unchecked'}
          onPress={() => { setChecked(item.departmentCode);console.log }}
        />
        <Text>{item.departmentName}</Text>
      </View>
      
    );
  };

  const ItemCheckboxView = ({ item }) => {
    return (

      <View style={[styles.radioView]}>
        <Checkbox
          style={styles.itemStyle}
          value={item.key.jobCode}
          status={item.checked ? 'checked':'unchecked'}
          onPress={() => {
            updateCheckboxSelection(item.id);
          }}
        />
        <Text>{item.key.jobName}</Text>
      </View>
    );
  };

  const ItemTextView = ({ item }) => {
    return (
        <View>
          <Text style={styles.itemHeadStyle}>
            [{item.employeeCode}] - {item.positionLevelName} {item.jobName}
          </Text>
          <Text style={styles.itemStyle}>
            | {item.employeeFullname} - {item.email} - {item.telMobile}
          </Text>
        </View>
        

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

  const updateCheckboxSelection = (id) => {
    
    setJob((old)=>{
      const index = old.findIndex(x=>x.id === id);
      old[index].checked = !old[index].checked;
      return [...old];
    });
    
  };

  return (
    <SafeAreaView style={styles.vertcontainer}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <FlatList
            data={department}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemRadioView}
          />
          <Button onPress={getEmployee} title="Fetch Employees" color="#841584" />
        </View>
        <View style={styles.subcontainer}>

          <FlatList
            data={job}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemCheckboxView}
            extraData={job}
          />

        </View>
      </View>
      <View style={styles.subcontainerfull}>
          <FlatList
            data={employee}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemTextView}
            extraData={employee}
          />
        </View>
    </SafeAreaView>
  );
};

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor: '#000',
    alignItems: 'center',
  },
  vertcontainer: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    backgroundColor: '#000',
    alignItems: 'center',
  },
  subcontainer: {
    width: screen.width/2, 
    height: screen.height/2,
    backgroundColor: '#fff',
  },
  subcontainerfull: {
    width: screen.width, 
    height: screen.height/2,
    backgroundColor: '#fff',
  },
  itemStyle: {
    padding: 5,
    color: '#000',
  },
  itemHeadStyle: {
    padding: 5,
    color: '#fff',
    backgroundColor: '#555'
  },
  radioView: {
    alignItems: 'center',
    flexDirection:"row",
  }
});

export default App;