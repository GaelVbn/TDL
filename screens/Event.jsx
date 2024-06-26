import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function Event() {
    const [items, setItems] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState('');

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
    

    const renderItem = (item) => {  
        return (
        <View style={{ margin: 10, padding: 10, backgroundColor: 'white' }}>
            <Text>{item.note}</Text>
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
        newItems[selectedDate].push({ note });
        setItems(newItems);
        setModalVisible(false);
        setNote('');
      };

      return (
        <View style={{ flex: 1, marginTop: '15%' }}>
          <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={new Date().toISOString().split('T')[0]}
            renderItem={renderItem}
            onDayPress={handleDayPress}
          />
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Ajouter une note pour {selectedDate}</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Entrez votre note"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20 }}
              />
              <Button title="Enregistrer" onPress={saveNote} />
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>
      );
    };
