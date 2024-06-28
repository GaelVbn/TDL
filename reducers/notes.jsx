import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNoteToStore(state, action) {
            state.value.push(action.payload);
        },
        removeNoteFromStore(state, action) {
            state.value = state.value.filter((task) => task.id !== action.payload);
        },
        updateNoteInStore(state, action) {
            const index = state.value.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.value[index] = action.payload;
            }
        },
    },
});

export const { addNoteToStore, removeNoteFromStore, updateNoteInStore } = notesSlice.actions;
export default notesSlice.reducer;
