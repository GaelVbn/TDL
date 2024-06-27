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
                <Text style={styles.titleText}>TO DO LIST</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.containerBtn}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a task"
                        placeholderTextColor="grey"
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
                            textStyle={{ color: 'black', fontFamily: 'ChakraPetch_400Regular', }}
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
        backgroundColor: '#7E7E7E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.1,
        width: '100%',
        borderRadius: 20,
    },
    input: {
        height: 40,
        width: '45%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#e5e7e6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.4,
        fontFamily: 'ChakraPetch_400Regular',
    },
    btn: {
        height: 40,
        width: '13%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#DA7B27',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.4,
    },
    btnText: {
        color: 'black',
        fontFamily: 'ChakraPetch_400Regular',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'orange',
        width: '80%',
        marginTop: '15%',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
        
    },
    container: {
        flex: 5,
        alignItems: 'center',
        backgroundColor: '#CACACA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },  
        shadowOpacity: 0.1,
        opacity: 0.8,
        width: '95%',
        height: '50%',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: '10%',
    },
});
