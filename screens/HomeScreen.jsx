import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToStore } from '../reducers/tasks';
import Tasks from '../Components/Tasks'; // Correct path to your Tasks component

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [task, setTask] = useState("");
    const tasks = useSelector((state) => state.tasks.value); // Access tasks from the store

    const addTask = () => {
        if (task) {
            dispatch(addTaskToStore({ id: Date.now(), task: task, urgent: checked }));
            setTask("");
        }
    };

    const sortedTasks = tasks.slice().sort((a, b) => b.urgent - a.urgent);

    const taskList = sortedTasks.map((task) => (
        <Tasks key={task.id} id={task.id} task={task.task} urgent={task.urgent} />
    ));

    return (
        <View style={styles.Gcontainer}>
            <View style={styles.title}>
                <Text>Your ToDoList</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.containerBtn}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a task"
                        onChangeText={(e) => setTask(e)}
                        value={task}
                    />
                    <View style={styles.CheckBox}>
                        <CheckBox
                            checked={checked}
                            onPress={() => setChecked(!checked)}
                            size={18}
                            title={"Urgent"}
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={addTask}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerList}>
                    {taskList}
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
