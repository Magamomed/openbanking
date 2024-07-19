import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTransactions } from './api';
import FilterModal from './FilterModal';

const AccountStatement = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = async () => {
    try {
      setRefreshing(true);
      const data = await getTransactions(user.id);
      setTransactions(data);
      setFilteredTransactions(data);
      setRefreshing(false);
    } catch (error) {
      console.error('Ошибка загрузки транзакций:', error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  const applyFilter = (startDate, endDate) => {
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
    setIsFilterApplied(true);
    setShowFilterModal(false);
  };

  const clearFilter = () => {
    setFilteredTransactions(transactions);
    setIsFilterApplied(false);
    setShowFilterModal(false);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  const getTransactionType = (transaction) => {
    if (transaction.sender_email === user.email) return 'expense';
    if (transaction.recipient_email === user.email) return 'income';
    return 'other';
  };

  const renderTransaction = ({ item }) => {
    const transactionType = getTransactionType(item);


    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Icon
            name={transactionType === 'income' ? 'arrow-down' : 'arrow-up'}
            size={24}
            color={transactionType === 'income' ? 'green' : 'red'}
          />
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>
          {item.sender} -> {item.recipient}
          </Text>
          <Text style={styles.transactionAmount}>₸{item.amount}</Text>
        </View>
      </View>
    );
  };

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = formatDate(transaction.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
  };

  const sections = Object.entries(groupTransactionsByDate(filteredTransactions)).map(([date, data]) => ({
    title: date,
    data,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.transactionsTitle}>История</Text>
        <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.iconButton}>
          <Icon name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        {isFilterApplied && (
          <TouchableOpacity onPress={clearFilter} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Очистить фильтр</Text>
          </TouchableOpacity>
        )}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTransactions} />}
      />
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilter}
        onClear={clearFilter}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
