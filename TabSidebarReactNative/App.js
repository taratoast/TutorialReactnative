import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Local Import
import { ApiMenu } from './service/ApiService';
import { HttpClient } from './service/HttpClient';
import { HOST, PORT } from './service/Global';
import { getToken } from './service/TokenService';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screen import
import { Home, Second } from './screen';


const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();


const TabNav = () => {
  return (
    <Tab.Navigator
        activeColor='#000000'
        inactiveColor='#AAAAAA'
        barStyle={{ backgroundColor: '#FFFFFF' }}
        shifting={true}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          color="#FFFFFF"
          options={{
            tabBarLabel: 'Employee',
            tabBarColor: '#FFDDDD',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account-group" color={color} size={26} />
            ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Second"
          component={Second}
          options={{
            tabBarLabel: 'Job',
            tabBarColor: '#DDDDFF',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="newspaper" color={color} size={26} />
            ),
          }}
        ></Tab.Screen>

      </Tab.Navigator>
  );
}

export default function App() {

  const [menu,setMenu] = useState([]);

  const getMenu = async () => {

    var json = {
      // "flagdelete": "N",
      // "flagactive": "",
    }
    HttpClient(HOST, PORT).post(ApiMenu.getMenu, json).then(response => {
      console.log('Menu:', response.data)
      setMenu(response.data)
    })
  }

  const fetchToken = async () => {
    const result = await getToken('duongjai@double-p.co.th', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342');
    await AsyncStorage.setItem('token', result);
    console.log('ResultToken: ', result);
  }

  useEffect(() => {

    fetchToken();
    getMenu();

  }, []);

  return (
    <NavigationContainer>
      
      <Drawer.Navigator 
        initialRouteName='Nesting Bottom Tab'
      >
        {menu.map((_, i) => (
          <Drawer.Screen name={i + " | " + _.menuName} component={TabNav} key={i} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
