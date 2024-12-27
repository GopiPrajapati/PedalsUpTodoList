import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../utility/screens';
import TodoList from '../screens/TodoList';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.TODO_LIST} component={TodoList} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
