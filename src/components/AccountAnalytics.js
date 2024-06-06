import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountAnalytics = () => {
  const fakeData = {
    accounts: [
      { id: 1, type: 'Current', balance: '0.54 Т' },
      { id: 2, type: 'Card', balance: '0.00 Т' },
    ],
    otherAccounts: [
      { id: 3, bank: 'Банк Центр Кредит', balance: '20,000.00 Т' },
      { id: 4, bank: 'Отбасы Банк', balance: '100.00 Т' },
      { id: 5, bank: 'AO "Bank RBK"', balance: '0.00 Т' },
      { id: 6, bank: 'AO "Home Credit Bank"', balance: '0.00 Т' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Счета</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Счета</Text>
        {fakeData.accounts.map(account => (
          <View key={account.id} style={styles.accountItem}>
            <Text>{account.type}</Text>
            <Text>{account.balance}</Text>
          </View>
        ))}
        <Text style={styles.addNewAccount}>Открыть новый счет</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Счета в других банках</Text>
        {fakeData.otherAccounts.map(account => (
          <View key={account.id} style={styles.accountItem}>
            <Text>{account.bank}</Text>
            <Text>{account.balance}</Text>
          </View>
        ))}
        <Text style={styles.addNewAccount}>Добавить счета других банков</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addNewAccount: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AccountAnalytics;
