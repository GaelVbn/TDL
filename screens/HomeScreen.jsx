import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { addTaskToStore } from '../reducers/Tasks';


export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [tasks, setTasks] = useState("");

    const addTask = () => {
        if (tasks) {
            dispatch(addTaskToStore({ task: tasks, urgent: checked }));
            setTasks("");
        }
    }


    return (
        <View style={styles.Gcontainer}>
            <View style={styles.title}>
                <Text>Your ToDoList</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.containerBtn}>
                    <TextInput style={styles.input} placeholder="Add a task" onChangeText={(e) => setTasks(e)} value={tasks}/>
                    <View style={styles.CheckBox}>
                        <CheckBox checked={checked} onPress={() => setChecked(!checked)} size={18} title={"Urgent"} containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }} />
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerList}>
                    <Tasks />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  Gcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'blue',
    width: '95%',
  },
  CheckBox: {
    width: 'auto',
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  input: {
    height: 40,
    width: '40%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    height: 40,
    width: '20%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    width: '80%',
    marginTop: '10%',
  },
  container: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: 'grey',
    width: '90%',
    marginBottom: '10%',
    borderRadius: 20,
  },
});
