import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const transactions = [
  { id: '1', date: '07 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '2', date: '07 JUN', amount: 100, type: 'expense', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
  { id: '3', date: '08 JUN', amount: 200, type: 'income', description: 'Lorem ipsum' },
];

const AccountStatement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.transactionsTitle}>История</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Icon
                name={item.type === 'income' ? 'arrow-down' : 'arrow-up'}
                size={24}
                color={item.type === 'income' ? 'green' : 'red'}
              />
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={styles.transactionAmount}>₸{item.amount}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#00796b',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  incomeExpense: {
    fontSize: 14,
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  transactionIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDate: {
    fontSize: 12,
    color: '#00796b',
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  transactionDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
});

export default AccountStatement;
