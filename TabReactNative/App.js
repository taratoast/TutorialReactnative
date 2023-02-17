import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screen import
import { Home, Second } from './screen';


const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
