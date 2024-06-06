import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalBalance = () => {
  const fakeData = {
    accounts: [
      { id: 1, balance: 2000 },
      { id: 2, balance: 5000 },
    ],
  };
  const totalBalance = fakeData.accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <Text style={styles.item}>Total Balance: ${totalBalance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default TotalBalance;
