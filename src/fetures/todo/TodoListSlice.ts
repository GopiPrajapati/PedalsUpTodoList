import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export interface TodoListState {
    todos: [{
        id: number,
        taskName: string,
        date: string,
        isMarkedCompleted: boolean
    }]
}


// const initialState :TodoListState ={
const initialState: TodoListState = {
    todos: []
}

// const todoSlice = createSlice({
//     name: 'todo',
//     initialState,

//     reducers: {
//         addTodo(state, action) {
//             state.todos.push(action.payload)
//         },
//         removeTodo(state, action) {
//             state.todos = state.todos.filter(obj => obj.id !== action.payload)
//         },
//         editTask: (state, action) => {
//             const { id, taskName, date } = action.payload;
//             console.log('date', date)
//             const task = state.todos.find(task => task.id === id);
//             if (task) {
//                 task.taskName = taskName;
//                 task.date = date;

//             }
//         },
//         setAllTheTodos: (state, action: PayloadAction<any[]>) => {
//             state.todos = action.payload; // Initialize the Redux store with data from AsyncStorage
//         },
//     }

// })
// export const { addTodo, removeTodo, editTask, setAllTheTodos } = todoSlice.actions


// export default todoSlice.reducer

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            const { id, taskName, date, isMarkedCompleted } = action.payload;
            // const formattedDate = moment(date).format('MMM DD, YYYY h:mm A'); // Format the date correctly
            // state.todos.push({ id, taskName, date: date });
            state.todos.push({ id, taskName, date: date, isMarkedCompleted });
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(obj => obj.id !== action.payload);
        },
        editTask(state, action) {
            const { id, taskName, date } = action.payload;
            console.log('date', date)
            // const formattedDate = moment(date).format('MMM DD, YYYY h:mm A'); // Ensure date format consistency
            const task = state.todos.find(task => task.id === id);
            if (task) {
                task.taskName = taskName;
                // task.date = formattedDate;
                task.date = date
            }
        },
        setAllTheTodos: (state, action: PayloadAction<any[]>) => {
            // const todos = action.payload.map(todo => ({
            //     ...todo,
            //     // date: moment(todo.date).format('MMM DD, YYYY h:mm A'), // Format the date when setting initial data
            //     // date: todo.date
            // }));
            // state.todos = todos;
            state.todos = action.payload

        },
    },
});

export const { addTodo, removeTodo, editTask, setAllTheTodos } = todoSlice.actions;

export default todoSlice.reducer;

// // export const { addTodo, removeTodo, editTask, setAllTheTodos } = todoSlice.actions


// // export default todoSlice.reducer