import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountBalance = () => {
  const fakeBalance = 2000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Balance</Text>
      <Text style={styles.item}>Current Balance: ${fakeBalance}</Text>
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

export default AccountBalance;
