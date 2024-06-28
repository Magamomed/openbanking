import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountAnalytics from '../components/AccountAnalytics';
import balanceData from '../data/balances.json';

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState(balanceData.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number);
  };

  const validateExpiryDate = (date) => {
    return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date);
  };

  const validateCvv = (code) => {
    return /^[0-9]{3}$/.test(code);
  };

  const handleAddCard = () => {
    const newErrors = {};
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Неверный номер карты';
    }
    if (!validateExpiryDate(expiryDate)) {
      newErrors.expiryDate = 'Неверный срок действия';
    }
    if (!validateCvv(cvv)) {
      newErrors.cvv = 'Неверный CVV';
    }

    if (Object.keys(newErrors).length === 0) {
      setModalVisible(false);
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim());
  };

  const handleExpiryDateChange = (text) => {
    if (text.length === 2 && !text.includes('/')) {
      setExpiryDate(`${text}/`);
    } else {
      setExpiryDate(text);
    }
  };

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

            {/* Слайдер для дополнительных счетов */}
            <ScrollView horizontal pagingEnabled style={styles.slider}>
        {data.accounts && data.accounts.map((account, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.accountBankName}>{account.bankName}</Text>
            <Text style={styles.accountBalance}>Текущий баланс: {account.currentBalance} {account.currency}</Text>
            <Text style={styles.accountAvailableBalance}>Доступный баланс: {account.availableBalance} {account.currency}</Text>
            <Text style={styles.accountBlockedBalance}>Заблокированный баланс: {account.blockedBalance} {account.currency}</Text>
          </View>
        ))}
      </ScrollView>

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


      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Добавить счета других банков</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Привязать новую карту</Text>
            <TextInput
              style={[styles.input, errors.cardNumber && styles.inputError]}
              placeholder="Номер карты"
              placeholderTextColor="#888"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputHalf, errors.expiryDate && styles.inputError]}
                placeholder="Срок действия"
                placeholderTextColor="#888"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.inputHalf, errors.cvv && styles.inputError]}
                placeholder="CVV / CVC"
                placeholderTextColor="#888"
                value={cvv}
                onChangeText={setCvv}
                secureTextEntry
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            <Text style={styles.inputHint}>3 цифры на обороте</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddCard}>
              <Text style={styles.modalButtonText}>Привязать карту</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  creditLineContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  creditLineItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  creditLineType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  creditLineAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  creditLineIncluded: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00796b',
    marginBottom: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#888',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  inputHint: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
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
