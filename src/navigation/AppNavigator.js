import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Home from '../components/Home';
import AccountAnalytics from '../components/AccountAnalytics';
import AccountStatement from '../components/AccountStatement';
import AccountBalance from '../components/AccountBalance';
import TotalBalance from '../components/TotalBalance';
import SavingsGoal from '../components/SavingsGoal';
import PersonalizedOffers from '../components/PersonalizedOffers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="AccountAnalyticsScreen" component={AccountAnalytics} />
    <Stack.Screen name="AccountStatementScreen" component={AccountStatement} />
    <Stack.Screen name="AccountBalanceScreen" component={AccountBalance} />
    <Stack.Screen name="TotalBalanceScreen" component={TotalBalance} />
    <Stack.Screen name="SavingsGoalScreen" component={SavingsGoal} />
    <Stack.Screen name="PersonalizedOffersScreen" component={PersonalizedOffers} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'HomeTab':
                iconName = 'home';
                break;
              case 'AccountsTab':
                iconName = 'bank';
                break;
              case 'StatementsTab':
                iconName = 'file-document';
                break;
              case 'BalancesTab':
                iconName = 'scale-balance';
                break;
              case 'GoalsTab':
                iconName = 'target';
                break;
              default:
                iconName = 'home';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="AccountsTab" component={AccountAnalytics} options={{ tabBarLabel: 'Accounts' }} />
        <Tab.Screen name="StatementsTab" component={AccountStatement} options={{ tabBarLabel: 'Statements' }} />
        <Tab.Screen name="BalancesTab" component={AccountBalance} options={{ tabBarLabel: 'Balances' }} />
        <Tab.Screen name="GoalsTab" component={SavingsGoal} options={{ tabBarLabel: 'Goals' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
