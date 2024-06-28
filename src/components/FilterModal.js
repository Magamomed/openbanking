import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterModal = ({ visible, onClose, onApply, onClear }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Фильтр</Text>
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Начальная дата: </Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
              style={styles.dateTimePicker}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Конечная дата: </Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
              style={styles.dateTimePicker}
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.applyButton} onPress={() => onApply(startDate, endDate)}>
              <Icon name="check" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Icon name="cancel" size={24} color="white" />
          </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dateTimePicker: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  applyButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
  },
});

export default FilterModal;
