import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, Platform  } from 'react-native';
import { Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import useStore from '../storageState/store';
import { EvilIcons } from '@expo/vector-icons';

const MyAgenda = () => {
  const { items, setItems } = useStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const loadItems = (day) => {
    const newItems = {};
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = new Date(time).toISOString().split('T')[0];
      if (!items[strTime]) {
        newItems[strTime] = [];
      } else {
        newItems[strTime] = items[strTime];
      }
    }
    setItems(newItems);
  };

  const removeEvent = (date, index) => {
    const newItems = { ...items };
    newItems[date].splice(index, 1);
    if (newItems[date].length === 0) {
      delete newItems[date];
    }
    setItems(newItems);
  };

  const renderItem = (item, firstItemInDay, index) => {
    return (
      <View style={styles.item}>
        <Text>{item.startTime} - {item.endTime}{"\n"}</Text>
        <Text>{item.note}</Text>
        <EvilIcons 
          name="trash" 
          size={24} 
          color="black" 
          style={{ position: 'absolute', right: '5%', top: '50%' }} 
          onPress={() => removeEvent(item.date, index)} 
        />
      </View>
    );
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const saveNote = () => {
    const newItems = { ...items };
    if (!newItems[selectedDate]) {
      newItems[selectedDate] = [];
    }
    newItems[selectedDate].push({ 
        note, 
        startTime: startTime.toTimeString().split(' ')[0],
        endTime: endTime.toTimeString().split(' ')[0],
        date: selectedDate,
    });
    setItems(newItems);
    setModalVisible(false);
    setNote('');
    setStartTime(new Date());
    setEndTime(new Date());
  };


  return (
    <View style={{ flex: 1, marginTop: '20%' }}>
                  <View style={styles.title}>
                <Text style={styles.titleText}>CALENDAR</Text>
            </View>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: '#DA7B27',
          agendaTodayColor: '#DA7B27',
          dotColor: '#DA7B27',
          }}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={{marginBottom: 20, fontFamily: 'ChakraPetch_400Regular',}}>Ajouter une note pour {selectedDate}</Text>
          <TextInput
           
            value={note}
            onChangeText={setNote}
            placeholder="Entrez votre note"
            style={styles.input}
          />
          <View style = {{flexDirection: 'row'}}>
          <View style={styles.timeContainer}>
            <Button title="Heure de début" />
          </View>
          <Text style = {{margin: 10}}> - </Text>
          <View style={styles.timeContainer}>
            <Button title="Heure de fin"/>
          </View>
          </View>
          <View style={ {flexDirection: 'row', gap: 80}}>
          { (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={(event, date) => {
                if (date) setStartTime(date);
              }}
            />
          )}
          { (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={(event, date) => {
                if (date) setEndTime(date);
              }}
            />
          )}
          </View>
          <View style={{justifyContent: 'space-between', marginTop: 30, }}>
          <Button title="Enregistrer" onPress={saveNote} />
          <Button title="Annuler" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    opacity: 0.8,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    fontFamily: 'ChakraPetch_400Regular',
    padding: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
},
titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'ChakraPetch_400Regular',
},
});

export default MyAgenda;
