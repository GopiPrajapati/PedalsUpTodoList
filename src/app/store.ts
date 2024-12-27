import { configureStore, } from "@reduxjs/toolkit";
import todoSliceReducer from '../fetures/todo/TodoListSlice';

export const store = configureStore({
    reducer: {
        todo: todoSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['todo.todos'],
                ignoredActions: ['todo/addTodo', 'todo/setAllTheTodos', 'todo/editTask'],

            },
        }),

})


export type AppDispatch = typeof store.dispatch;


// Using this you don't need to definer types of reducers in the store it will automatically manage the types
export type RootState = ReturnType<typeof store.getState>
