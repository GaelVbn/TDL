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
    },
});

export const { addNoteToStore, removeNoteFromStore } = notesSlice.actions;
export default notesSlice.reducer;
