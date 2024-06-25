import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskToStore(state, action) {
            state.value.push(action.payload);
        },
        removeTaskFromStore(state, action) {
            state.value = state.value.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTaskToStore, removeTaskFromStore } = tasksSlice.actions;
export default tasksSlice.reducer;
