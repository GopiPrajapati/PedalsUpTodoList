import moment from 'moment';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Container} from '../components/background/Container';
import Input from '../components/input/InputText';
import MText from '../components/text/MText';
import {
  addTodo,
  editTask,
  removeTodo,
  setAllTheTodos,
} from '../fetures/todo/TodoListSlice';
import colors from '../utility/colors';
import {TODO_LIST} from '../utility/constants';
import images from '../utility/images';
import {formateDate, getData, storeData} from '../utility/utils';

const TodoList: FC = () => {
  const timer = useRef(null);

  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState<Date | string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const data = useAppSelector(state => state.todo.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchDataFromAsyncStorage();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const fetchDataFromAsyncStorage = async () => {
    const storedTodos = await getData(TODO_LIST);

    if (storedTodos) {
      dispatch(setAllTheTodos(storedTodos));
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmitClick = async () => {
    if (!taskName || !date) {
      alert('Please enter a task name and select a date.');
      return;
    }

    if (isEditing) {
      // Update the task

      dispatch(editTask({id: editId, taskName, date: date}));
      const updatedData = data.map(item =>
        item.id === editId ? {...item, taskName, date} : item,
      );

      await storeData(TODO_LIST, updatedData);
    } else {
      dispatch(
        addTodo({
          taskName,
          date: date,
          id: Date.now().toString(),
          isMarkedCompleted: false,
        }),
      );

      let value = [...data, {taskName, date: date, id: Date.now().toString()}];

      await storeData(TODO_LIST, value);
    }

    setTaskName('');
    setDate('');
    setIsEditing(false);
    setEditId(null);
  };

  // const handleEdit = task => {
  //   setTaskName(task.taskName);
  //   setEditId(task.id);
  //   setIsEditing(true);
  //   let parsedDate;

  //   if (
  //     task.date &&
  //     moment(task.date, 'MMM DD,<ctrl3348> h:mm A', true).isValid()
  //   ) {
  //     // The 'true' makes it strict parsing
  //     parsedDate = moment(task.date, 'MMM DD,<ctrl3348> h:mm A').toDate();
  //   } else {
  //     parsedDate = new Date(); // Provide a default date
  //   }
  //   setDate(parsedDate);
  // };
  const handleEdit = task => {
    setTaskName(task.taskName);
    setEditId(task.id);
    setIsEditing(true);

    // Parse the date string back to a Date object
    let parsedDate;
    if (task.date) {
      parsedDate = moment(task.date).toDate(); // Use moment to parse the date
    } else {
      parsedDate = new Date(); // Default to the current date if none exists
    }

    setDate(parsedDate); // Set the parsed date for the picker
  };

  const handleDeletePress = async (id: number) => {
    dispatch(removeTodo(id));
    const filteredData = data?.filter(obj => obj.id !== id);
    await storeData(TODO_LIST, filteredData);
  };
  const handleMarkAsCompleteClicked = id => {
    const updatedTodos = data.map(todo =>
      todo.id === id ? {...todo, isMarkedCompleted: true} : todo,
    );
    dispatch(setAllTheTodos(updatedTodos));

    // Start a timer to remove the item after 1.5 seconds
    timer.current = setTimeout(async () => {
      dispatch(removeTodo(id));
      const filteredTodos = updatedTodos.filter(todo => todo.id !== id);
      await storeData(TODO_LIST, filteredTodos); // Save updated state to AsyncStorage
    }, 1500);
  };

  const handleCancelTimer = id => {
    // Clear the timer if it exists
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null; // Reset the timer
    }
    const updatedTodos = data.map(todo =>
      todo.id === id ? {...todo, isMarkedCompleted: false} : todo,
    );
    dispatch(setAllTheTodos(updatedTodos)); // Update the store
  };

  const renderTodoList = item => {
    const {id, date, taskName, isMarkedCompleted} = item.item ?? {};
    return (
      <View style={styles.flatListCon}>
        <View style={styles.row}>
          <View style={styles.markAsCompletedCon}>
            <TouchableOpacity
              style={styles.deleteOrEdit}
              onPress={() => {
                if (isMarkedCompleted) {
                  handleCancelTimer(id);
                } else {
                  handleMarkAsCompleteClicked(id);
                }
              }}>
              {isMarkedCompleted ? (
                <Image source={images.tick} style={styles.image} />
              ) : (
                <Image source={images.empty} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.7}}>
            <MText style={styles.taskTitle} kind="medium">
              {String(taskName).charAt(0).toUpperCase() +
                String(taskName).slice(1)}
            </MText>
            <MText style={{color: colors.gray}} kind="small">
              {formateDate(date)}
            </MText>
          </View>
          <View style={styles.deleteAndEditCon}>
            <TouchableOpacity
              style={styles.deleteOrEdit}
              onPress={() => {
                handleDeletePress(id);
              }}>
              <MaterialCommunityIcons
                name="delete"
                style={{color: colors.red}}
                size={hp(2.8)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteOrEdit}
              onPress={() => handleEdit(item.item)}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                style={{color: colors.black}}
                size={hp(2.8)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <View style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            // backgroundColor: colors.white,
          }}>
          <View>
            <View style={styles.con}>
              <MText style={styles.title} kind="h2">
                Task List
              </MText>
            </View>

            <View style={{marginHorizontal: wp(4)}}>
              <Input
                hint={'Task'}
                placeholder={'Enter Task'}
                onChange={value => setTaskName(value)}
                value={taskName}
                autoCapitalize={'none'}
                isMandatory={true}
              />

              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={styles.dateSelection}>
                <MText kind="line" style={styles.dateText}>
                  {date ? (
                    moment(date).format('lll')
                  ) : (
                    <MText color={colors.hintColor} kind="line">
                      Select Date
                    </MText>
                  )}
                </MText>
              </TouchableOpacity>
              <DateTimePickerModal
                mode="datetime"
                isVisible={isDatePickerVisible}
                onConfirm={date => {
                  setDate(date);
                  setDatePickerVisibility(false);
                }}
                onCancel={() => hideDatePicker()}
                maximumDate={new Date()}
                date={date || new Date()}
              />

              <TouchableOpacity
                style={styles.submitCon}
                onPress={handleSubmitClick}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>

              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderTodoList}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.backgroundBlue,
    paddingBottom: hp(1),
  },
  title: {
    fontSize: hp(3.5),
    textDecorationLine: 'underline',
    color: colors.white,
    marginHorizontal: wp(4),
  },
  checkmark: {
    fontSize: hp(2),
  },
  checkmarkCon: {
    paddingHorizontal: hp(0.6),
    paddingVertical: hp(0.6),
    marginVertical: hp(1),
    borderRadius: hp(1),
    borderColor: colors.black,
    borderWidth: hp(0.15),
  },
  subTitle: {
    marginTop: hp(2),
    fontSize: hp(2.5),
    textDecorationLine: 'underline',
    // color: colors.black,
    color: colors.black,
  },
  flatListCon: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: colors.white,
    // backgroundColor: '#846fb070',
    // backgroundColor: colors.backgroundBlue,
    marginVertical: hp(1),
    borderRadius: hp(1),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
  },
  submitCon: {
    // backgroundColor: colors.purple,
    backgroundColor: colors.backgroundBlue,
    marginVertical: hp(2),
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: hp(1),
  },
  submitText: {
    fontWeight: '500',
    fontSize: hp(2.5),
    textDecorationLine: 'underline',
    color: colors.white,
  },
  taskTitle: {
    fontSize: hp(1.8),
    textDecorationLine: 'underline',
    color: colors.black,
  },
  deleteOrEdit: {
    paddingHorizontal: wp(1),
  },
  image: {
    height: hp(2.2),
    width: hp(2.2),
  },
  deleteAndEditCon: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: 'center',
  },
  dateSelection: {
    backgroundColor: colors.white,
    marginTop: hp(2),
    borderRadius: hp(1),
    borderColor: colors.borderColor,
    borderWidth: hp(0.2),
  },
  dateText: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  markAsCompletedCon: {flex: 0.1, justifyContent: 'center'},
});
