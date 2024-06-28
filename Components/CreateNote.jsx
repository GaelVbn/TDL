import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeNoteFromStore } from '../reducers/notes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const CreateNote = ({ date, description, title, id, onEdit, color }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const removeNote = (id) => {
        dispatch(removeNoteFromStore(id));
        setModalVisible(false);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + ' ...' : description;

    return (
        <View style={[styles.note, { Color: color }]}>
            <TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'ChakraPetch_400Regular', fontSize: 17 }}>{title}  <FontAwesome name="exclamation" size={20} color={color} />{'\n'}</Text>
                    <TouchableOpacity onPress={showModal}>
                        <FontAwesome name="trash" size={20} color="#7E7E7E" />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: 'ChakraPetch_400Regular' }}>
                    {showFullDescription ? description : truncatedDescription}
                    {description.length > 100 && (
                        <Text onPress={toggleFullDescription} style={{ color: '#7E7E7E', fontFamily: 'ChakraPetch_400Regular', fontSize: 12 }}>
                            {showFullDescription ? ' - Show Less' : ' Read More'}
                        </Text>
                    )}
                    {'\n'}
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={onEdit}>
                    <FontAwesome name="edit" size={30} color="orange" />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'ChakraPetch_400Regular', alignSelf: 'flex-end', fontSize: 12 }}>{date}</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.titleModalContainer}>
                        <Text style={styles.titleText}>Delete Note?</Text>
                    </View>
                    <View style={styles.btnDeleteNoteContainer}>
                        <TouchableOpacity style={styles.btnDeleteNote} onPress={() => removeNote(id)}>
                            <Text style={{ color: '#e5e7e6', fontWeight: 'bold', fontFamily: 'ChakraPetch_400Regular' }}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDeleteNote} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: '#e5e7e6', fontWeight: 'bold', fontFamily: 'ChakraPetch_400Regular' }}>NO</Text>
                        </TouchableOpacity>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#e5e7e6',
    },
    modal: {
        backgroundColor: '#7E7E7E',
        width: '80%',
        height: '20%',
        marginTop: '50%',
        marginLeft: '10%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleModalContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
        color: '#e5e7e6',
    },
    btnDeleteNoteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    btnDeleteNote: {
        backgroundColor: '#DA7B27',
        borderRadius: 10,
        padding: 10,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
    },
});

export default CreateNote;
