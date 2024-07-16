import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../components/MainScreen';
import AccountStatement from '../components/AccountStatement';
import AccountBalance from '../components/AccountBalance';
import SavingsGoal from '../components/SavingsGoal';
import ProfileSettingsScreen from '../components/ProfileSettingScreen';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import TransferForm from '../components/TransferForm';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {props => <LoginForm {...props} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {props => <RegisterForm {...props} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Main':
              iconName = 'wallet';
              break;
            case 'Statements':
              iconName = 'file-document';
              break;
            case 'Balances':
              iconName = 'scale-balance';
              break;
            case 'Goals':
              iconName = 'target';
              break;
            case 'ProfileSettings':
              iconName = 'account-settings';
              break;
            case 'UserList':
              iconName = 'account-group';
              break;
            default:
              iconName = 'wallet';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Main">
        {props => <MainScreen {...props} user={currentUser} />}
      </Tab.Screen>
      <Tab.Screen name="Statements" component={AccountStatement} options={{ tabBarLabel: 'История' }} />
      <Tab.Screen name="Balances" component={AccountBalance} options={{ tabBarLabel: 'Аналитика' }} />
      <Tab.Screen name="Goals" component={SavingsGoal} options={{ tabBarLabel: 'Цель' }} />
      <Tab.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ tabBarLabel: 'Профиль' }} />
      <Tab.Screen name="Transfer" options={{ tabBarLabel: 'Перевод' }}>
        {props => <TransferForm {...props} currentUser={currentUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainTabs">
            {props => <MainTabs {...props} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
