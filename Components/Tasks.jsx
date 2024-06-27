import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox, Icon} from '@rneui/themed';
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
                      checkedIcon={
                        <Icon
                          name="radio-button-checked"
                          type="material"
                          color="#DA7B27"
                          size={25}
                          iconStyle={{ marginRight: 10 }}
                        />
                      }
                      uncheckedIcon={
                        <Icon
                          name="radio-button-unchecked"
                          type="material"
                          color="grey"
                          size={25}
                          iconStyle={{ marginRight: 10 }}
                        />
                      }
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    size={25}
                    containerStyle={{ backgroundColor: 'transparent'}}
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
        backgroundColor: '#e5e7e6',
        justifyContent: 'space-between',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },  
        shadowOpacity: 0.1,
        width: '100%',

    },
    Gcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FBFBFB',
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
        fontFamily: 'ChakraPetch_400Regular',
    },
    trashContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '4%',
    },
    Tasks: {
        marginLeft: 10,
        fontSize: 20,
        fontFamily: 'ChakraPetch_400Regular',
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
