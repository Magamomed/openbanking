import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const BankAnalyticsCategoriesScreen = () => {
  // Пример тестовых данных
  const testData = [
    {
      bank: 'Bank A',
      categories: [
        { category: 'Еда', amount: 500 },
        { category: 'Транспорт', amount: 300 },
        { category: 'Развлечения', amount: 200 },
      ],
    },
    {
      bank: 'Bank B',
      categories: [
        { category: 'Еда', amount: 600 },
        { category: 'Транспорт', amount: 250 },
        { category: 'Развлечения', amount: 150 },
      ],
    },
    {
      bank: 'Bank C',
      categories: [
        { category: 'Еда', amount: 450 },
        { category: 'Транспорт', amount: 200 },
        { category: 'Развлечения', amount: 180 },
      ],
    },
    {
      bank: 'Bank D',
      categories: [
        { category: 'Еда', amount: 700 },
        { category: 'Транспорт', amount: 280 },
        { category: 'Развлечения', amount: 120 },
      ],
    },
    {
      bank: 'Bank E',
      categories: [
        { category: 'Еда', amount: 550 },
        { category: 'Транспорт', amount: 320 },
        { category: 'Развлечения', amount: 170 },
      ],
    },
  ];

  // Формирование данных для круговых диаграмм
  const pieData = testData.map((item, index) => ({
    name: item.bank,
    amount: item.categories.reduce((acc, category) => acc + category.amount, 0),
    color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Аналитика расходов по категориям</Text>
      <FlatList
        data={testData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bankContainer}>
            <Text style={styles.bankName}>{item.bank}</Text>
            <FlatList
              data={item.categories}
              keyExtractor={(category, index) => index.toString()}
              renderItem={({ item: category }) => (
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryName}>{category.category}</Text>
                  <Text style={styles.amount}>${category.amount}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
      <PieChart
        data={pieData}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bankContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
  },
});

export default BankAnalyticsCategoriesScreen;
