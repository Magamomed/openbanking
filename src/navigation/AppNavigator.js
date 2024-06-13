import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../components/MainScreen';
import AccountAnalytics from '../components/AccountAnalytics';
import AccountStatement from '../components/AccountStatement';
import AccountBalance from '../components/AccountBalance';
import TotalBalance from '../components/TotalBalance';
import SavingsGoal from '../components/SavingsGoal';
import ProfileSettingsScreen from '../components/ProfileSettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Main':
                iconName = 'wallet';
                break;
              case 'Accounts':
                iconName = 'bank';
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
              default:
                iconName = 'wallet';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Main" component={MainScreen} options={{ tabBarLabel: 'Главная' }} />
        <Tab.Screen name="Statements" component={AccountStatement} options={{ tabBarLabel: 'История' }} />
        <Tab.Screen name="Balances" component={AccountBalance} options={{ tabBarLabel: 'Аналитика' }} />
        <Tab.Screen name="Goals" component={SavingsGoal} options={{ tabBarLabel: 'Цель' }} />
        <Stack.Screen 
          name="ProfileSettings" 
          component={ProfileSettingsScreen} 

        />
      </Tab.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;
