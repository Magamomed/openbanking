import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../components/MainScreen';
import AccountAnalytics from '../components/AccountAnalytics';
import AccountStatement from '../components/AccountStatement';
import AccountBalance from '../components/AccountBalance';
import TotalBalance from '../components/TotalBalance';
import SavingsGoal from '../components/SavingsGoal';

const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="Main" component={MainScreen} options={{ tabBarLabel: 'Main' }} />
        <Tab.Screen name="Statements" component={AccountStatement} options={{ tabBarLabel: 'Statements' }} />
        <Tab.Screen name="Balances" component={AccountBalance} options={{ tabBarLabel: 'Balances' }} />
        <Tab.Screen name="Goals" component={SavingsGoal} options={{ tabBarLabel: 'Goals' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
