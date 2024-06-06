import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavingsGoal = () => {
  const fakeGoals = [
    { id: 1, name: 'Vacation', amount: 3000, saved: 1000 },
    { id: 2, name: 'New Car', amount: 20000, saved: 5000 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goals</Text>
      {fakeGoals.map(goal => (
        <Text key={goal.id} style={styles.item}>
          {goal.name}: ${goal.saved} / ${goal.amount}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default SavingsGoal;
