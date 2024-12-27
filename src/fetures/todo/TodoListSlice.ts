import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoListState {
    todos: [{
        id: number,
        taskName: string,
        date: string,
        isMarkedCompleted: boolean
    }]
}
const initialState: TodoListState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            const { id, taskName, date, isMarkedCompleted } = action.payload;
            state.todos.push({ id, taskName, date: date, isMarkedCompleted });
        },

        removeTodo(state, action) {
            state.todos = state.todos.filter(obj => obj.id !== action.payload);
        },

        editTask(state, action) {
            const { id, taskName, date } = action.payload;
            const task = state.todos.find(task => task.id === id);
            if (task) {
                task.taskName = taskName;
                task.date = date
            }
        },

        setAllTheTodos: (state, action: PayloadAction<any[]>) => {
            state.todos = action.payload

        },
    },
});

export const { addTodo, removeTodo, editTask, setAllTheTodos } = todoSlice.actions;

export default todoSlice.reducer;