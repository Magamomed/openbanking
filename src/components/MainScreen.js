import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AccountAnalytics from '../components/AccountAnalytics';
import balanceData from '../data/balances.json';

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Устанавливаем данные напрямую из импортированного файла
    setData(balanceData.data);
  }, []);

  if (!data) {
    return <Text>Loading...</Text>; // Показываем индикатор загрузки
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate("ProfileSettings")}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AE</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мой Кошелек</Text>
        <Icon name="cog" size={24} style={styles.headerIcon} />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Текущий Счет</Text>
        <Text style={styles.balanceAmount}>₸ {data.currentBalance}</Text>
        <Text style={styles.balanceSubAmount}>Доступный баланс: ₸ {data.availableBalance}</Text>
        <Text style={styles.balanceSubAmount}>Заблокированный баланс: ₸ {data.blockedBalance}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Statements')}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>История</Text>
          <Text style={styles.sortText}>за последние 24-ч</Text>
        </View>
      </TouchableOpacity>

      {data.creditLine && (
        <View style={styles.creditLineContainer}>
          <Text style={styles.sectionTitle}>Кредитные линии</Text>
          {data.creditLine.map((line, index) => (
            <View key={index} style={styles.creditLineItem}>
              <Text style={styles.creditLineType}>{line.type}</Text>
              <Text style={styles.creditLineAmount}>
                {line.amount.currency} {line.amount.amount}
              </Text>
              <Text style={styles.creditLineIncluded}>
                Включено: {line.included ? "Да" : "Нет"}
              </Text>
            </View>
          ))}
        </View>
      )}

      {data.purses && (
        <View style={styles.pursesContainer}>
          <Text style={styles.sectionTitle}>Кошельки</Text>
          {data.purses.map((purse, index) => (
            <View key={index} style={styles.purseItem}>
              <Text style={styles.purseCurrency}>{purse.currency}</Text>
              <Text style={styles.purseAmount}>{purse.amount}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.accountAnalyticsContainer}>
        <AccountAnalytics />
      </View>
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    backgroundColor: '#1a237e', // Черно-синий фон, как у пластиковой карты
    borderRadius: 15, // Увеличиваем радиус скругления для более плавного вида
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, // Увеличиваем смещение тени для глубокого эффекта
    shadowOpacity: 0.3, // Увеличиваем прозрачность тени
    shadowRadius: 5,
    elevation: 5, // Android тень
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Белый текст на темном фоне
    marginBottom: 10,
    textAlign: 'center', // Центрируем текст
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffeb3b', // Желтый цвет для выделения
    textAlign: 'center',
  },
  balanceSubAmount: {
    fontSize: 16,
    color: '#bdbdbd', // Серый цвет для вспомогательной информации
    textAlign: 'center',
    marginTop: 5,
  },

  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sortText: {
    fontSize: 16,
    color: '#666',
  },
  creditLineContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  creditLineItem: {
    marginBottom: 15,
  },
  creditLineType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  creditLineAmount: {
    fontSize: 16,
    color: '#666',
  },
  creditLineIncluded: {
    fontSize: 14,
    color: '#888',
  },
  pursesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  purseItem: {
    marginBottom: 15,
  },
  purseCurrency: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  purseAmount: {
    fontSize: 16,
    color: '#666',
  },
  accountAnalyticsContainer: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
});

export default MainScreen;
