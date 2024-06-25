import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeTaskFromStore } from '../reducers/tasks';

export default function Tasks({ id, task, urgent }) {
    const dispatch = useDispatch();
    const remove = useSelector((state) => state.tasks.value);
    const removeTask = (id) => {
        dispatch(removeTaskFromStore(id))
    };


    return (
        <View style={styles.Gcontainer}>
            <Text style={styles.Tasks}>{task}</Text>
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
    Gcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: 'yellow',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20,
    },
    urgentContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 130,
    },
    trashContainer: {
        marginLeft: 15,
    },
    Tasks: {
        marginLeft: 10,
        fontSize: 20,
    },
});
