import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const BankAnalyticsCategoriesScreen = () => {
  const testData = [
    {
      bank: 'Банк Центр Кредит',
      categories: [
        { category: 'Еда', amount: 5000, limit: 3000 },
        { category: 'Транспорт', amount: 1000, limit: 2000 },
        { category: 'Развлечения', amount: 2000, limit: 1500 },
      ],
      transactions: [
        { id: 1, name: 'Кафе', date: '17 июня', amount: -500 },
        { id: 2, name: 'Метро', date: '17 июня', amount: -200 },
        { id: 3, name: 'Ресторан', date: '16 июня', amount: -1000 },
      ],
    },
    {
      bank: 'Отбасы Банк',
      categories: [
        { category: 'Еда', amount: 5600, limit: 30000 },
        { category: 'Транспорт', amount: 2500, limit: 10000 },
        { category: 'Развлечения', amount: 1500, limit: 5000 },
      ],
      transactions: [
        { id: 1, name: 'Магазин', date: '17 июня', amount: -1500 },
        { id: 2, name: 'Такси', date: '17 июня', amount: -300 },
      ],
    },
    {
      bank: 'AO "Bank RBK"',
      categories: [
        { category: 'Еда', amount: 4500, limit: 30000 },
        { category: 'Транспорт', amount: 2000, limit: 10000 },
        { category: 'Развлечения', amount: 1800, limit: 5000 },
      ],
      transactions: [
        { id: 1, name: 'Супермаркет', date: '17 июня', amount: -2000 },
        { id: 2, name: 'Кино', date: '16 июня', amount: -700 },
      ],
    },
    {
      bank: 'AO "Home Credit Bank"',
      categories: [
        { category: 'Еда', amount: 4700, limit: 30000 },
        { category: 'Транспорт', amount: 2800, limit: 10000 },
        { category: 'Развлечения', amount: 1200, limit: 5000 },
      ],
      transactions: [
        { id: 1, name: 'Обед', date: '17 июня', amount: -300 },
        { id: 2, name: 'Автобус', date: '16 июня', amount: -100 },
      ],
    },
  ];

  const [selectedBank, setSelectedBank] = useState(testData[0]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newNotifications = [];
    selectedBank.categories.forEach((category) => {
      if (category.amount > category.limit) {
        newNotifications.push({
          id: category.category,
          message: `Вы превысили лимит на ${category.category}. Лимит: ${category.limit}, Расходы: ${category.amount}`,
        });
      }
    });
    setNotifications(newNotifications);
  }, [selectedBank]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity onPress={() => dismissNotification(id)} style={styles.dismissButton}>
      <Text style={styles.dismissButtonText}>Убрать</Text>
    </TouchableOpacity>
  );

  const renderBankAnalytics = (bankData) => {
    const barData = {
      labels: bankData.categories.map((item) => item.category),
      datasets: [
        {
          data: bankData.categories.map((item) => item.amount),
          color: (opacity = 1) => `rgba(34, 150, 243, ${opacity})`,
        },
      ],
    };

    return (
      <View style={styles.analyticsContainer}>
        <Text style={styles.chartTitle}>Аналитика расходов</Text>
        <Text style={styles.chartSubtitle}>{bankData.bank}</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 150, 243, ${opacity})`,
            labelColor: () => '#333',
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
        <Text style={styles.historyTitle}>История транзакций</Text>
        <ScrollView style={styles.historyList}>
          {bankData.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.historyItem}>
              <View style={styles.details}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.date}>{transaction.date}</Text>
              </View>
              <Text style={styles.amount}>{transaction.amount < 0 ? '-' : ''}₸{Math.abs(transaction.amount)}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.notificationList}>
          {notifications.map((notification) => (
            <Swipeable key={notification.id} renderRightActions={() => renderRightActions(notification.id)}>
              <View style={styles.notificationItem}>
                <Text>{notification.message}</Text>
              </View>
            </Swipeable>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Аналитика</Text>
        <MaterialIcons name="account-balance" size={40} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bankList}>
        {testData.map((bank, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedBank(bank)} style={[styles.bankItem, selectedBank.bank === bank.bank && styles.selectedBankItem]}>
            <Text style={[styles.bankName, selectedBank.bank === bank.bank && styles.selectedBankName]}>{bank.bank}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderBankAnalytics(selectedBank)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bankList: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  bankItem: {
    width: 150, // Фиксированная ширина
    height: 40, // Фиксированная высота
    justifyContent: 'center', // Центрирование текста по вертикали
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#e7e7e7',
  },
  selectedBankItem: {
    backgroundColor: '#2296F3',
    width: 150, // Фиксированная ширина
    height: 40, // Фиксированная высота
  },
  bankName: {
    color: '#333',
    textAlign: 'center', // Центрирование текста по горизонтали
  },
  selectedBankName: {
    color: '#fff',
    textAlign: 'center', // Центрирование текста по горизонтали
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  analyticsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%', // Ширина контейнера
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  historyList: {
    marginTop: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationList: {
    marginTop: 10,
  },
  notificationItem: {
    backgroundColor: '#ffdddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dismissButton: {
    backgroundColor: '#ff3333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10,
  },
  dismissButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BankAnalyticsCategoriesScreen;
