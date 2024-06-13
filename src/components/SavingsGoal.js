import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform, SectionList } from 'react-native';
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
  const [editingGoalId, setEditingGoalId] = useState(null);

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
  };

  const updateSavedAmount = (goalId, newAmount) => {
    const updatedGoals = savingsGoals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          saved: parseFloat(newAmount),
        };
      }
      return goal;
    });

    setSavingsGoals(updatedGoals);
    setEditingGoalId(null);
  };

  const renderGoal = ({ item }) => (
    <View style={styles.goalContainer}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalName}>{item.name}</Text>
        <Text style={styles.goalAmount}>
          ₸{item.saved} / ₸{item.target}
        </Text>
        <Icon name="pencil-circle" size={24} color="#00796b" onPress={() => setEditingGoalId(item.id)} />
      </View>
      {editingGoalId === item.id ? (
        <View style={styles.editFormContainer}>
          <TextInput
            style={styles.input}
            placeholder="Новая сумма"
            keyboardType="numeric"
            value={newGoalSaved}
            onChangeText={setNewGoalSaved}
          />
          <Button title="Сохранить" onPress={() => updateSavedAmount(item.id, newGoalSaved)} />
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={24} color={item.saved >= item.target ? 'green' : '#ccc'} />
          <Text style={styles.goalStatus}>{item.saved >= item.target ? 'Completed' : 'In Progress'}</Text>
          
        </View>
      )}
    </View>
  );

  const sections = [
    {
      title: 'Цели Сбережений',
      data: savingsGoals,
    },
    {
      title: 'Добавить новую цель',
      data: [{}], // Пустой объект, чтобы использовать рендеринг формы как элемент списка
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, section }) => {
          if (section.title === 'Добавить новую цель') {
            return (
              <View style={styles.formContainer}>
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
                <TextInput
                  style={styles.input}
                  placeholder="Накоплено"
                  keyboardType="numeric"
                  value={newGoalSaved}
                  onChangeText={setNewGoalSaved}
                />
                <Button title="Добавить цель" onPress={addGoal} />
              </View>
            );
          } else {
            return renderGoal({ item });
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#00796b',
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
    marginBottom: 10,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  goalAmount: {
    fontSize: 16,
    color: '#00796b',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editFormContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  goalStatus: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    color: '#00796b',
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#00796b',
    borderWidth: 1,
  },
});

export default SavingsGoal;
