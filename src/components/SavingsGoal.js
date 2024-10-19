// ... другие импорты
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, RefreshControl, Modal, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSavingsGoal, addToSavingsGoal, createSavingsGoal, getAccounts } from './api';

const SavingsGoal = ({ user }) => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // Инициализация как null
  const [showAccountModal, setShowAccountModal] = useState(false);

  const loadSavingsGoals = async () => {
    try {
      setRefreshing(true);
      const data = await getSavingsGoal(user.id);
      setSavingsGoals(data);
      setFilteredGoals(data);
      setRefreshing(false);
    } catch (error) {
      console.error('Ошибка загрузки целей накопления:', error);
      setRefreshing(false);
    }
  };

  const loadAccounts = async () => {
    try {
      const accountData = await getAccounts(user.id);
      console.log('Данные аккаунтов:', accountData); // отладка
      setAccounts(accountData);
    } catch (error) {
      console.error('Ошибка загрузки аккаунтов:', error);
    }
  };
  

  useEffect(() => {
    loadSavingsGoals();
    loadAccounts(); 
  }, [user]);

  const addGoal = async () => {
    if (!newGoalName || !newGoalTarget) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    try {
      const goalData = {
        user_id: user.id,
        name: newGoalName,
        target: parseFloat(newGoalTarget),
        saved: 0,
      };

      const response = await createSavingsGoal(goalData);
      loadSavingsGoals();
      setShowModal(false);
      setNewGoalName('');
      setNewGoalTarget('');
      Alert.alert('Успех', 'Цель накопления создана успешно');
    } catch (error) {
      console.error('Ошибка создания новой цели:', error);
      Alert.alert('Ошибка', 'Ошибка создания цели накопления. Пожалуйста, попробуйте снова.');
    }
  };

  const updateGoal = async () => {
    if (!additionalAmount || !editGoalId || !selectedAccount) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите аккаунт и введите сумму');
      return;
    }

    try {
      await addToSavingsGoal(editGoalId, parseFloat(additionalAmount), selectedAccount.id);
      loadSavingsGoals();
      setEditGoalId(null);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Ошибка добавления средств:', error);
    }
  };

  const renderGoal = ({ item }) => {
    const percentage = (item.saved / item.target) * 100;
    return (
      <View style={styles.goalItem}>
        <View style={styles.goalIcon}>
          <Icon name="piggy-bank" size={24} color="#00796b" />
        </View>
        <View style={styles.goalDetails}>
          <Text style={styles.goalName}>{item.name}</Text>
          <Text style={styles.goalAmount}>₸{item.saved} / {item.target}</Text>
          <View style={styles.progressBarContainer}>
            <View style={{ ...styles.progressBar, width: `${percentage}%` }} />
          </View>
        </View>
        <TouchableOpacity onPress={() => setEditGoalId(item.id)}>
          <Icon name="pencil" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  console.log('Текущий selectedAccount:', selectedAccount);


  const renderAccount = ({ item }) => (
    <TouchableOpacity onPress={() => {
      console.log('Выбранный аккаунт:', item); // Добавьте вывод в консоль для отладки
      setSelectedAccount(item);
      setShowAccountModal(false);
    }}>
      <Text style={styles.accountItem}>{item.bank_name}</Text>
    </TouchableOpacity>
  );
  

  const sections = [
    { title: 'Текущие цели', data: filteredGoals }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Цели накопления</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Text style={styles.addButtonText}>Добавить цель</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGoal}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadSavingsGoals} />}
      />

      <Modal visible={showModal} transparent={true} animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Новая цель накопления</Text>
            <TextInput
              style={styles.input}
              placeholder="Название цели"
              value={newGoalName}
              onChangeText={setNewGoalName}
            />
            <TextInput
              style={styles.input}
              placeholder="Целевая сумма"
              keyboardType="numeric"
              value={newGoalTarget}
              onChangeText={setNewGoalTarget}
            />
            <Button title="Добавить цель" onPress={addGoal} />
            <Button title="Отмена" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      {editGoalId && (
        <Modal visible={!!editGoalId} transparent={true} animationType="slide" onRequestClose={() => setEditGoalId(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Добавить сумму к цели</Text>
              <TextInput
                style={styles.input}
                placeholder="Сумма"
                keyboardType="numeric"
                value={additionalAmount}
                onChangeText={setAdditionalAmount}
              />
              <TouchableOpacity onPress={() => setShowAccountModal(true)}>
              <Text style={styles.selectedAccount}>
  {selectedAccount ? selectedAccount.bank_name : 'Выберите аккаунт'}
</Text>

              </TouchableOpacity>
              <Button title="Добавить" onPress={updateGoal} />
              <Button title="Отмена" onPress={() => setEditGoalId(null)} />
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={showAccountModal} transparent={true} animationType="slide" onRequestClose={() => setShowAccountModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите аккаунт</Text>
            {accounts.map(renderAccount)}
            <Button title="Закрыть" onPress={() => setShowAccountModal(false)} />
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  goalItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  goalIcon: {
    marginRight: 15,
  },
  goalDetails: {
    flex: 1,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalAmount: {
    fontSize: 16,
    color: '#666',
  },
  progressBarContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    height: 10,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  accountItem: {
    padding: 10,
    fontSize: 16,
    color: '#00796b',
  },
  selectedAccount: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
});

export default SavingsGoal;
