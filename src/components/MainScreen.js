import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const images = {
  "Банк Центр Кредит": require('../img/logo-otbasy-bank_white_converted.png'),
  "Отбасы Банк": require('../img/logo-otbasy-bank_white_converted.png'),
  "AO 'Bank RBK'": require('../img/logo-otbasy-bank_white_converted.png'),
  "AO 'Home Credit Bank'": require('../img/logo-otbasy-bank_white_converted.png'),
};

const MainScreen = ({ user }) => {
  useEffect(() => {
    if (user) {
      console.log('Текущий пользователь:', user);
      console.log(user.accounts);
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Загрузка данных пользователя...</Text>
      </View>
    );
  }

  const convertStringToNumber = (str) => parseFloat(str);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.headerTitle}>Мой Кошелек</Text>
        <Icon name="cog" size={24} style={styles.headerIcon} />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Текущий Счет</Text>
        <Text style={styles.balanceAmount}>₸ {user.accounts.reduce((total, account) => total + convertStringToNumber(account.current_balance), 0).toFixed(2)}</Text>
        <Text style={styles.balanceSubAmount}>Доступный баланс: ₸ {user.accounts.reduce((total, account) => total + convertStringToNumber(account.available_balance), 0).toFixed(2)}</Text>
        <Text style={styles.balanceSubAmount}>Заблокированный баланс: ₸ {user.accounts.reduce((total, account) => total + convertStringToNumber(account.blocked_balance), 0).toFixed(2)}</Text>
      </View>

      <ScrollView horizontal pagingEnabled style={styles.slider}>
        {user.accounts && user.accounts.map((account, index) => (
          <View key={index} style={styles.slide}>
            <Image source={images[account.bank_name]} style={styles.accountLogo} resizeMode="contain" />
            <Text style={styles.accountBankName}>{account.bank_name}</Text>
            <Text style={styles.accountBalance}>Текущий баланс: {convertStringToNumber(account.current_balance)} {account.currency}</Text>
            <Text style={styles.accountAvailableBalance}>Доступный баланс: {convertStringToNumber(account.available_balance)} {account.currency}</Text>
            <Text style={styles.accountBlockedBalance}>Заблокированный баланс: {convertStringToNumber(account.blocked_balance)} {account.currency}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Добавить счета других банков</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcon: {
    color: '#555',
  },
  balanceContainer: {
    backgroundColor: '#1a237e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffeb3b',
    textAlign: 'center',
  },
  balanceSubAmount: {
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    marginTop: 5,
  },
  slider: {
    marginBottom: 20,
  },
  slide: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  accountLogo: {
    width: 150,
    height: 75,
    marginBottom: 10,
  },
  accountBankName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  accountBalance: {
    fontSize: 14,
    color: '#666',
  },
  accountAvailableBalance: {
    fontSize: 14,
    color: '#666',
  },
  accountBlockedBalance: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainScreen;
