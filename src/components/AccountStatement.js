import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountStatement = () => {
  const fakeData = {
    transactions: [
      { id: 1, date: '2023-01-01', amount: -50, description: 'Grocery Store' },
      { id: 2, date: '2023-01-02', amount: -100, description: 'Electric Bill' },
      { id: 3, date: '2023-01-03', amount: 1500, description: 'Salary' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Statement</Text>
      {fakeData.transactions.map(transaction => (
        <Text key={transaction.id} style={styles.item}>
          {transaction.date} - {transaction.description}: ${transaction.amount}
        </Text>
      ))}
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

export default AccountStatement;
