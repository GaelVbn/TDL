import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { CheckBox, Icon } from '@rneui/themed';
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
            setChecked(false);
        }
    };

    const sortedTasks = tasks.slice().sort((a, b) => b.urgent - a.urgent);

    const taskList = sortedTasks.map((task) => (
        <Tasks key={task.id} id={task.id} task={task.task} urgent={task.urgent} />
    ));

    return (
        <View style={styles.Gcontainer}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Your ToDoList</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.containerBtn}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a task"
                        placeholderTextColor="#C5C5A9"
                        onChangeText={(e) => setTask(e)}
                        value={task}
                    />
                    <View style={styles.CheckBox}>
                        <CheckBox
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#DA7B27"
                            checked={checked}
                            onPress={() => setChecked(!checked)}
                            title={"Urgent"}
                            iconType="material-community"
                            textStyle={{ color: 'black' }}
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={addTask}>
                        <Text style={styles.btnText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.containerList}>
                    {taskList}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Gcontainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEE6D8',
    },
    containerList: {
        display: 'flex',
        flex: 1,
        //backgroundColor: 'blue',
        marginTop: '5%',
        width: '95%',
    },
    CheckBox: {
        width: 'auto',
       // backgroundColor: 'yellow',
    },
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#606C5A',
        width: '100%',
        borderRadius: 20,
    },
    input: {
        height: 40,
        width: '45%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    btn: {
        height: 40,
        width: '13%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#DA7B27',
        marginRight: 10,
    },
    btnText: {
        color: 'black',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'orange',
        width: '80%',
        marginTop: '10%',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
    },
    container: {
        flex: 5,
        alignItems: 'center',
        backgroundColor: '#424340',
        width: '95%',
        height: '50%',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: '10%',
    },
});
