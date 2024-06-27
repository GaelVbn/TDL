import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeNoteFromStore } from '../reducers/notes';
import { useState } from 'react';

const CreateNote = ({date, description, title, id }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const removeNote = (id) => {
        dispatch(removeNoteFromStore(id));
    };

    const showModal = () => {
        setModalVisible(true);
    };
    return (
        <View style={styles.note}>
            <TouchableOpacity onPress={showModal}>
            <Text style={{ fontWeight: 'bold', fontFamily: 'ChakraPetch_400Regular', fontSize: 17 }}>{title}{'\n'}</Text>
            <Text style={{ fontFamily: 'ChakraPetch_400Regular' }}>{description}{'\n'}</Text>
            <Text style={{ fontFamily: 'ChakraPetch_400Regular', alignSelf: 'flex-end', fontSize: 12 }}>{date}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                <View style={styles.closeModalContainer}>
                    <View style={styles.titleModalContainer}>
                        <Text style={styles.titleText}>Delete Note ?</Text>
                    </View>
                    <View style={styles.btnDeleteNoteContainer}>
                        <TouchableOpacity onPress={() => removeNote(id)}><Text>YES</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}><Text>NO</Text></TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    note: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#e5e7e6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        padding: 10,
    },
    modal: {
        backgroundColor: 'white',
        width: '60%',
        height: '15%',
        marginTop: '100%',
        marginLeft: '20%',
        borderRadius: 10,
    },
    titleModalContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
    },
    closeModalContainer: {
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 20,
    },
    btnDeleteNoteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default CreateNote; // Assurez-vous que CreateNote est bien exporté par défaut
