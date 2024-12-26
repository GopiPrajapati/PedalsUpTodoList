import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../utility/screens';
import TodoListScreen from '../screens/TodoListScreen';
import Todo from '../screens/ToDo';
import TodoList from '../screens/TodoList';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen
        name={screens.TODO_LIST_SCREEN}
        component={TodoListScreen}
      /> */}
      <Stack.Screen name={'TodoList'} component={TodoList} />
      {/* <Stack.Screen name={'ToDo'} component={Todo} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigation;
