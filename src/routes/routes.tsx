import React from 'react'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home.screen';
import GuideScreen from '../screens/guide.screen';
import { DEFAULT_COLORS } from '../global-styles/colors';
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
        <Stack.Screen
          name='Guide'
          component={GuideScreen}
          options={headerStyles.guide}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const headerStyles: {
  home: StackNavigationOptions
  guide: StackNavigationOptions
} = {
  home: {
    headerShown: false,
    animationEnabled: false,
  },
  guide: {
    headerShown: false,
    animationEnabled: false,
  }

}
