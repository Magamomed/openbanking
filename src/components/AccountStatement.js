import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import transactionsData from '../data/transactions.json';

const AccountStatement = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(transactionsData.data.transactions);
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  const getTransactionType = (indicator) => {
    return indicator === 'CREDIT' ? 'income' : 'expense';
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Icon
          name={getTransactionType(item.creditDebitIndicator) === 'income' ? 'arrow-down' : 'arrow-up'}
          size={24}
          color={getTransactionType(item.creditDebitIndicator) === 'income' ? 'green' : 'red'}
        />
        <Text style={styles.transactionDate}>{formatDate(item.bookingDateTime)}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.debtorAgent.name}</Text>
        <Text style={styles.transactionAmount}>₸{item.amount.amount}</Text>
      </View>
    </View>
  );

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = formatDate(transaction.bookingDateTime);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
  };

  const sections = Object.entries(groupTransactionsByDate(transactions)).map(([date, data]) => ({
    title: date,
    data,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.transactionsTitle}>История</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.transactionId}
        renderItem={renderTransaction}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
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
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
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
