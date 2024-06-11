import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AccountAnalytics from '../components/AccountAnalytics';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage}
        />
        <Text style={styles.headerTitle}>Mой Кошелек</Text>
        <Icon name="cog" size={24} style={styles.headerIcon} />
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Текущий Счет</Text>
        <Text style={styles.balanceAmount}>₸ 149.868</Text>
        
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>История</Text>
        <Text style={styles.sortText}>за последние 24-ч</Text>
      </View>
      <View style={styles.assetsContainer}>
        <View style={styles.asset}>
        <Icon name="currency-kzt" size={24} color="#6a1b9a" />
          <View style={styles.assetInfo}>
            <Text style={styles.assetAmount}>25.05.2023</Text>
            <Text style={styles.assetValue}>₸ 89.759</Text>
            
          </View>
        </View>
        <View style={styles.asset}>
        <Icon name="currency-kzt" size={24} color="#d32f2f" />
          <View style={styles.assetInfo}>
            <Text style={styles.assetAmount}>15.03.2023</Text>
            <Text style={styles.assetValue}>₸54.724</Text>
            
          </View>
        </View>
        <View style={styles.asset}>
        <Icon name="currency-kzt" size={24} color="#424242" />
          <View style={styles.assetInfo}>
            <Text style={styles.assetAmount}>05.01.2023</Text>
            <Text style={styles.assetValue}>₸ 5.385</Text>
          </View>
        </View>
      </View>
      <AccountAnalytics/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcon: {
    color: '#000',
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#999',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  balanceChange: {
    fontSize: 16,
    color: 'green',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  sortText: {
    fontSize: 16,
    color: '#999',
  },
  assetsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  asset: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  assetInfo: {
    marginLeft: 10,
  },
  assetAmount: {
    fontSize: 16,
  },
  assetValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetChange: {
    fontSize: 14,
    color: 'green',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
});

export default MainScreen;
