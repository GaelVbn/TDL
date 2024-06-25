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
    },
});

export const { addTaskToStore } = tasksSlice.actions;
export default tasksSlice.reducer;
