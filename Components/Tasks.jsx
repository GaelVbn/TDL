import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeTaskFromStore } from '../reducers/tasks';
import { useState } from 'react';

export default function Tasks({ id, task, urgent }) {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const removeTask = (id) => {
        dispatch(removeTaskFromStore(id))
    };


    return (
        <View style={styles.globalcontainer}>
        <View style={styles.Gcontainer}>
            <View style={styles.CheckBox}>
                <CheckBox
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    size={18}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        />
            </View>
            <View style={styles.taskContainer} >
            <Text style={{ textDecorationLine: checked ? 'line-through' : 'none', fontSize: 20, }}>{task}</Text>
            </View>
        </View>
        {urgent && (
                <View style={styles.urgentContainer}>
                    <Text style={styles.Important}>Urgent</Text>
                </View>
            )}
        <View style={styles.trashContainer} >
                <Ionicons name="trash-outline" size={24} color="black" onPress={() => removeTask(id)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    globalcontainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        height: 'auto',
        backgroundColor: 'yellow',
        justifyContent: 'space-between',
        borderRadius: 20,

    },
    Gcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        borderRadius: 20,
        //backgroundColor: 'white',
    },
    urgentContainer: {
        display: 'flex',
        width: '18%',
        height: 50,
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    Important: {
        color: 'red',
        fontWeight: 'bold',
    },
    trashContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    Tasks: {
        marginLeft: 10,
        fontSize: 20,
    },
    taskContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        height: 50,
        alignItems: 'center',
        //backgroundColor: 'green',
    },
});
