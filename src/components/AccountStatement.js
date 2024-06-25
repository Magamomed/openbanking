import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import transactionsData from '../data/transactions.json';

const AccountStatement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    setTransactions(transactionsData.data.transactions);
    setFilteredTransactions(transactionsData.data.transactions);
  }, []);

  const applyFilter = () => {
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.bookingDateTime);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
    setIsFilterApplied(true);
  };

  const clearFilter = () => {
    setFilteredTransactions(transactions);
    setIsFilterApplied(false);
  };

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

  const sections = Object.entries(groupTransactionsByDate(filteredTransactions)).map(([date, data]) => ({
    title: date,
    data,
  }));

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.transactionsTitle}>История</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Начальная дата</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Конечная дата</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={applyFilter} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Применить фильтр</Text>
        </TouchableOpacity>
        {isFilterApplied && (
          <TouchableOpacity onPress={clearFilter} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Очистить фильтр</Text>
          </TouchableOpacity>
        )}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.transactionId}
        renderItem={renderTransaction}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onEndDateChange}
        />
      )}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
