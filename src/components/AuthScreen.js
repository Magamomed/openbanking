import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterForm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthScreen;
