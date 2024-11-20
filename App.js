import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login'; 
import SignUpScreen from './signup'; 
import LanguageScreen from './language';
import { i18n } from './i18n';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Language">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
       <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }}/>
       <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }}/>
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
