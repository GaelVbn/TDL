import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteToStore, updateNoteInStore } from '../reducers/notes';
import CreateNote from '../Components/CreateNote';

export default function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.value);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keyword, setKeyword] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');

    const showModal = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible) { // Réinitialiser la couleur sélectionnée seulement si le modal est en train d'être ouvert
            setSelectedColor('');
        }
    };
    

    const saveNote = () => {
        if (title === '' && description === '') {
            return alert('Please enter a title and description');
        }
        const date = new Date();
        const formattedDate = date.toLocaleString();

        const color = selectedColor || '#e5e7e6';

        if (editNoteId !== null) {
            dispatch(updateNoteInStore({ id: editNoteId, date: formattedDate, title, description, color }));
        } else {
            dispatch(addNoteToStore({ date: formattedDate, title, description, id: Date.now(), color}));
        }

        setModalVisible(false);
        setTitle('');
        setDescription('');
        setSelectedColor('');
        setEditNoteId(null);
    };

    const startEditNote = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setEditNoteId(note.id);
        setSelectedColor(note.color);
        setModalVisible(true);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.description.toLowerCase().includes(keyword.toLowerCase())
    );

    const notesList = (keyword ? filteredNotes : notes).map((note) => (
        <CreateNote key={note.id} id={note.id} description={note.description} title={note.title} date={note.date} onEdit={() => startEditNote(note)} color={note.color} />
    ));
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>NOTES</Text>
            </View>
            <View style={styles.inputKeywordContainer}>
                <TextInput
                    style={styles.inputKeyword}
                    placeholder="Keyword..."
                    onChangeText={(text) => setKeyword(text)}
                    value={keyword}
                />
            </View>
            <View style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: '80%',
                    alignSelf: 'center',
                    borderColor: '#CACACA',
                    borderWidth: 2,
                    marginBottom: 15,
                }}
                />
            <ScrollView style={styles.noteContainer}>
                <View style={styles.line}>
                    {notesList}
                </View>
            </ScrollView>
            <View style={styles.addContainer}>
            <View style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: '35%',
                    alignSelf: 'center',
                    borderColor: '#CACACA',
                    borderWidth: 2,
                }}
                />
            <TouchableOpacity onPress={() => {
                showModal();
                setTitle('');
                setDescription('');
                setEditNoteId(null);
                setSelectedColor(''); // Réinitialiser la couleur sélectionnée pour une nouvelle note
            }}>
                    <FontAwesome name="plus-square" size={55} color="orange" style={styles.logoAdd} />
                </TouchableOpacity>
                <View style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: '35%',
                    alignSelf: 'center',
                    borderColor: '#CACACA',
                    borderWidth: 2,
                }}
                />
            </View>
            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeModalContainer}>
                        <FontAwesome name="close" size={30} color="black" onPress={() => setModalVisible(false)} style={{ marginRight: 20 }} />
                    </View>
                    <View style={styles.titleModalContainer}>
                        <Text style={styles.titleText}>Write a note</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={(e) => setTitle(e)}
                            value={title}
                        />
                        <TextInput
                            style={[styles.input, { height: 200 }]}
                            placeholder="Description"
                            onChangeText={(e) => setDescription(e)}
                            value={description}
                            multiline
                            blurOnSubmit
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>
                    <View style={styles.colorBtnContainer}>
                            <TouchableOpacity style={[styles.colorBtnRed, selectedColor === 'red' && styles.selectedColorBtn]} onPress={() => setSelectedColor('red')} ><FontAwesome name="exclamation" size={30} style={{ color: 'red' }}/></TouchableOpacity>
                            <TouchableOpacity style={[styles.colorBtnGreen, selectedColor === '#008000' && styles.selectedColorBtn]} onPress={() => setSelectedColor('#008000')}><FontAwesome name="exclamation" size={30} style={{ color: '#008000' }}/></TouchableOpacity>
                            <TouchableOpacity style={[styles.colorBtnYellow, selectedColor === '#AD956B' && styles.selectedColorBtn]} onPress={() => setSelectedColor('#AD956B')}><FontAwesome name="exclamation" size={30} style={{ color: '#AD956B' }}/></TouchableOpacity>
                    </View>
                
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnSaveContainer} onPress={saveNote}>
                            <Text style={styles.btnText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '20%',
        //backgroundColor: 'blue',
    },
    noteContainer: {
        //backgroundColor: 'green',
        width: '100%',
        gap: 20,
        height: '50%',
    },
    line: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        height: 'auto',
        //backgroundColor: 'red',
    },
    addContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        //backgroundColor: 'red',
    },
    logoAdd: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,

    },
    titleNote: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
    },
    inputKeywordContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
    },
    inputKeyword: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'ChakraPetch_400Regular',
        padding: 10,
        width: '80%',
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'ChakraPetch_400Regular',
        padding: 10,
        width: '80%',
    },
    inputContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'orange',
        width: '100%',
        gap: 30,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    closeModalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        //backgroundColor: 'green',
        width: '100%',
        height: '10%',
        marginTop: '15%',
    },
    titleModalContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
    },
    btnSaveContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA500',
        width: '40%',
        marginTop: '5%',
        marginBottom: '50%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'ChakraPetch_400Regular',
        color: '#e5e7e6',
    },
    btnContainer: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        width: '100%',
    },
    colorBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    colorBtnRed: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        backgroundColor: '#e5e7e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBtnGreen: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        backgroundColor: '#e5e7e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBtnYellow: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        backgroundColor: '#e5e7e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
