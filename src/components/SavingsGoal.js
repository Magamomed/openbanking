import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const savingsGoals = [
  { id: '1', name: 'Отпуск', target: 10000, saved: 5000 },
  { id: '2', name: 'Машина', target: 20000, saved: 8000 },
  { id: '3', name: 'Фонд', target: 15000, saved: 15000 },
];

const SavingsGoal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Цель</Text>
      <FlatList
        data={savingsGoals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalContainer}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalName}>{item.name}</Text>
              <Text style={styles.goalAmount}>
                ₸{item.saved} / ₸{item.target}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="check-circle" size={24} color={item.saved >= item.target ? 'green' : '#ccc'} />
              <Text style={styles.goalStatus}>{item.saved >= item.target ? 'Completed' : 'In Progress'}</Text>
            </View>
          </View>
        )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  goalStatus: {
    fontSize: 16,
    marginLeft: 10,
    color: '#00796b',
  },
});

export default SavingsGoal;
