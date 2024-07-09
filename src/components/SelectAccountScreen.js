import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAccount } from '../components/AccountContext'; // путь к вашему AccountContext

const SelectAccountScreen = ({ route, navigation }) => {
  const { accounts, accountType } = route.params;
  const { setSelectedSourceAccount, setSelectedDestinationAccount } = useAccount();

  const handleSelectAccount = (account) => {
    if (accountType === 'source') {
      setSelectedSourceAccount(account.bankName);
    } else if (accountType === 'destination') {
      setSelectedDestinationAccount(account.bankName);
    }
    navigation.navigate('ProfileSettingsScreen', { [`selected${accountType.charAt(0).toUpperCase() + accountType.slice(1)}Account`]: account.bankName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Выберите счет</Text>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.bankName}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.accountItem} onPress={() => handleSelectAccount(item)}>
            <Text style={styles.accountText}>{item.bankName}</Text>
            <Text style={styles.balanceText}>
              {item.currency} {item.currentBalance.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  accountText: {
    fontSize: 16,
  },
  balanceText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SelectAccountScreen;
