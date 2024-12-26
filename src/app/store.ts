import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from '../fetures/todo/TodoListSlice'

export const store = configureStore({
    reducer: {
        todo: todoSliceReducer,
    }

})


export type AppDispatch = typeof store.dispatch;


// Using this you don't need to definer types of reducers in the store it will automatically manage the types
export type RootState = ReturnType<typeof store.getState>



// const data = [
//   {name: 'name 1', number: 'number 1', id: '1'},
//   {name: 'name 2', number: 'number 2', id: '2'},
//   {name: 'name 3', number: 'number 3', id: '3'},
//   {name: 'name 4', number: 'number 4', id: '4'},
//   {name: 'name  adsdas', number: '21212', id: '5'},
//   {name: 'name  adsdas1212', number: '21212', id: '6'},
//   {name: 'ihihi', number: '212w', id: '7'},
//   {name: 'op', number: '212w2', id: '8'},
//   {name: 'don', number: '909090', id: '9'},
//   {name: 'don2', number: '90909078', id: '10'},
//   {name: 'don2', number: '90909078', id: '11'},
//   {name: '0', number: '1212', id: '12'},
//   {name: '0', number: '1212', id: '13'},
//   {name: '0', number: '1212', id: '14'},
//   {name: '33', number: '2323', id: '15'},
//   {name: '33', number: '2323', id: '16'},
//   {name: '3333', number: '2323', id: '17'},
//   {name: '3333', number: '2323', id: '18'},
//   {name: '3333', number: '2323', id: '19'},
//   {name: '', number: '', id: '20'},
//   {name: '', number: '', id: '21'},
//   {name: '', number: '', id: '22'},
//   {name: 'as', number: 'as', id: '23'},
//   {name: 'Radhe', number: '90', id: '24'},
//   {name: '', number: 'dd', id: '25'},
//   {name: '', number: '', id: '26'},
//   {name: 'ggopi', number: '1111', id: '27'},
//   {name: 'Rahul', number: '222', id: '28'},
//   {name: 'Radhe', number: '1212', id: '29'},
//   {name: 'mom', number: '121212', id: '30'},
//   {name: 'Pratham', number: '77', id: '31'},
//   {name: 'PPP', number: '122', id: '32'},
//   {name: '', number: '', id: '33'},
//   {name: 'Radhe', number: '1121212', id: '34'},
//   {name: '', number: '', id: '35'},
//   {name: '', number: '', id: '36'},
// ];
