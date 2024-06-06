import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalizedOffers = () => {
  const fakeOffers = [
    { id: 1, description: 'Get a 5% cashback on groceries' },
    { id: 2, description: 'Save 10% on your next travel booking' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalized Offers</Text>
      {fakeOffers.map(offer => (
        <Text key={offer.id} style={styles.item}>
          {offer.description}
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

export default PersonalizedOffers;
