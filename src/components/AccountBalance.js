import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { List, Divider } from 'react-native-paper';

const BankAnalyticsCategoriesScreen = () => {
  // Пример тестовых данных
  const testData = [
    {
      bank: 'Банк Центр Кредит',
      categories: [
        { category: 'Еда', amount: 5000 },
        { category: 'Транспорт', amount: 1000 },
        { category: 'Развлечения', amount: 2000 },
      ],
    },
    {
      bank: 'Отбасы Банк',
      categories: [
        { category: 'Еда', amount: 5600 },
        { category: 'Транспорт', amount: 2500 },
        { category: 'Развлечения', amount: 1500 },
      ],
    },
    {
      bank: 'AO "Bank RBK"',
      categories: [
        { category: 'Еда', amount: 4500 },
        { category: 'Транспорт', amount: 2000 },
        { category: 'Развлечения', amount: 1800 },
      ],
    },
    {
      bank: 'AO "Home Credit Bank"',
      categories: [
        { category: 'Еда', amount: 4700 },
        { category: 'Транспорт', amount: 2800 },
        { category: 'Развлечения', amount: 1200 },
      ],
    },

  ];

 // Формирование данных для столбчатой диаграммы
 const barData = {
  labels: testData.map((item) => item.bank),
  datasets: [
    {
      data: testData.map((item) =>
        item.categories.reduce((acc, category) => acc + category.amount, 0)
      ),
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Цвет столбцов
    },
  ],
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Аналитика расходов по категориям</Text>
    <FlatList
      data={testData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.bankContainer}>
          <List.Accordion
            title={item.bank}
            titleStyle={styles.bankName}
            style={styles.bankAccordion}
            id={`accordion-${item.bank}`}
            left={(props) => <List.Icon {...props} icon="bank" />}
          >
            {item.categories.map((category, index) => (
              <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryName}>{category.category}</Text>
                <Text style={styles.amount}>₸{category.amount}</Text>
              </View>
            ))}
          </List.Accordion>
          <Divider />
        </View>
      )}
    />
    <BarChart
      style={{ marginTop: 20 }}
      data={barData}
      width={350}
      height={300}
      yAxisLabel="₸"
      fromZero
      chartConfig={{
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        decimalPlaces: 0, // Для отображения целых чисел
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  
            }}
      
      verticalLabelRotation={20}
      showValuesOnTopOfBars={true}
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
},
bankAccordion: {
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
},
bankName: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 10,
},
categoryContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
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
