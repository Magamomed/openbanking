import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileSettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Профиль и настройки</Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AE</Text>
          </View>
          <Text style={styles.profileName}>Арсен Русланулы Е.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.optionText}>Настройка сообщений</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="language-outline" size={24} color="black" />
            <Text style={styles.optionText}>Язык приложения</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={styles.optionText}>Переводы по номеру телефона</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="call" size={24} color="black" />
            <Text style={styles.optionText}>+7 (705) 5 • • • • 06</Text>
            <Text style={styles.optionSubText}>Ваш доверенный номер</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Безопасность</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={styles.optionText}>Смена пароля</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="key-outline" size={24} color="black" />
            <Text style={styles.optionText}>Смена кода доступа</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  optionSubText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileSettingsScreen;
