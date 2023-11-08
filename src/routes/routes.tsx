import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home.screen';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={headerStyles.home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const headerStyles = {
    home: {
      headerShown: false
    },
    settings: {
      headerStyle: {
        backgroundColor: '#FFF2D8'
      },
      headerShadowVisible: false,
      headerTintColor: '#113946'
    }
  
  }
  