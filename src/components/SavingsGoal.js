import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SavingsGoal = () => {
  const [savingsGoals, setSavingsGoals] = useState([
    { id: '1', name: 'Отпуск', target: 10000, saved: 5000 },
    { id: '2', name: 'Машина', target: 20000, saved: 8000 },
    { id: '3', name: 'Фонд', target: 15000, saved: 15000 },
  ]);

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalSaved, setNewGoalSaved] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [additionalAmount, setAdditionalAmount] = useState('');

  const addGoal = () => {
    if (!newGoalName || !newGoalTarget || !newGoalSaved) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const newGoal = {
      id: (savingsGoals.length + 1).toString(),
      name: newGoalName,
      target: parseFloat(newGoalTarget),
      saved: parseFloat(newGoalSaved),
    };

    setSavingsGoals([...savingsGoals, newGoal]);
    setNewGoalName('');
    setNewGoalTarget('');
    setNewGoalSaved('');
    setModalVisible(false); // Закрыть модальное окно после добавления цели
  };

  const updateGoal = () => {
    if (!additionalAmount) {
      Alert.alert('Ошибка', 'Пожалуйста, введите сумму');
      return;
    }

    const updatedGoals = savingsGoals.map(goal => {
      if (goal.id === editGoalId) {
        const newSaved = goal.saved + parseFloat(additionalAmount);
        return {
          ...goal,
          saved: newSaved > goal.target ? goal.target : newSaved
        };
      }
      return goal;
    });

    setSavingsGoals(updatedGoals);
    setEditGoalId(null);
    setAdditionalAmount('');
  };

  const markAsCompleted = (goalId) => {
    const updatedGoals = savingsGoals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          saved: goal.target
        };
      }
      return goal;
    });

    setSavingsGoals(updatedGoals);
  };

  const getProgressBarColor = (percentage) => {
    if (percentage <= 20) {
      return '#d32f2f'; // красный
    } else if (percentage <= 40) {
      return '#fbc02d'; // желтый
    } else {
      return '#388e3c'; // зеленый
    }
  };

  const renderGoal = ({ item }) => {
    const percentage = (item.saved / item.target) * 100;
    return (
      <View style={styles.goalContainer}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalName}>{item.name}</Text>
          <TouchableOpacity onPress={() => setEditGoalId(item.id)}>
            <Icon name="pencil" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={{ ...styles.progressBar, width: `${percentage}%`, backgroundColor: getProgressBarColor(percentage) }} />
        </View>
        <Text style={styles.goalProgress}>
          {item.saved} / {item.target} ({Math.round(percentage)}%)
        </Text>
        {percentage === 100 && (
          <View style={styles.completedContainer}>
            <Icon name="check-circle" size={24} color="#388e3c" />
            <Text style={styles.completedText}>Выполнено</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Персональные цели</Text>
      <FlatList
        data={savingsGoals}
        renderItem={renderGoal}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.goalList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Добавить цель</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Новая Цель</Text>
            <TextInput
              style={styles.input}
              placeholder="Название цели"
              placeholderTextColor="#000"
              value={newGoalName}
              onChangeText={setNewGoalName}
            />
            <TextInput
              style={styles.input}
              placeholder="Целевая сумма"
              keyboardType="numeric"
              placeholderTextColor="#000"
              value={newGoalTarget}
              onChangeText={setNewGoalTarget}
            />
            <TextInput
              style={styles.input}
              placeholder="Накоплено"
              keyboardType="numeric"
              placeholderTextColor="#000"
              value={newGoalSaved}
              onChangeText={setNewGoalSaved}
            />
            <Button title="Добавить цель" onPress={addGoal} />
            <Button title="Отмена" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {editGoalId && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!editGoalId}
          onRequestClose={() => setEditGoalId(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Добавить сумму</Text>
              <TextInput
                style={styles.input}
                placeholder="Сумма"
                keyboardType="numeric"
                placeholderTextColor="#000"
                value={additionalAmount}
                onChangeText={setAdditionalAmount}
              />
              <Button title="Обновить цель" onPress={updateGoal} />
              <Button title="Отмена" onPress={() => setEditGoalId(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginVertical: 20,
  },
  goalList: {
    paddingBottom: 20,
  },
  goalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    height: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
  },
  goalProgress: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  completedText: {
    fontSize: 16,
    color: '#388e3c',
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
});

export default SavingsGoal;
