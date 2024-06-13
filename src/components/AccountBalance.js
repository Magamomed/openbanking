import React, {useState} from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ScrollView  } from 'react-native';
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

  const [selectedBank, setSelectedBank] = useState(testData[0].bank);
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

const selectedBankData = testData.find(bank => bank.bank === selectedBank).categories.map((category, index) => ({
  name: category.category,
  amount: category.amount,
  color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
  legendFontColor: '#7F7F7F',
  legendFontSize: 15,
}));

const sections = [
  { title: 'Банки', data: testData, renderItem: renderBankItem },
  { title: 'Диаграммы', data: [{}], renderItem: renderCharts },
];

function renderBankItem({ item }) {
  return (
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
  );
}

function renderCharts() {
  return (
    <View>
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
        <ScrollView horizontal style={styles.buttonsContainer}>
          {testData.map((bank, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                selectedBank === bank.bank && styles.selectedButton,
              ]}
              onPress={() => setSelectedBank(bank.bank)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedBank === bank.bank && styles.selectedButtonText,
                ]}
              >
                {bank.bank}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
          <PieChart
            data={selectedBankData}
            width={350}
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
}

return (
  <View style={styles.container}>
  <Text style={styles.title}>Аналитика расходов по категориям</Text>
  <SectionList
    sections={sections}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, section }) => section.renderItem({ item })}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    )}
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
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
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#1E2923',
  },
  buttonText: {
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff',
  },
});
export default BankAnalyticsCategoriesScreen;
