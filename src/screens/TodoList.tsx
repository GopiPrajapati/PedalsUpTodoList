import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Container} from '../components/background/Container';
import colors from '../utility/colors';
import MText from '../components/text/MText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Input from '../components/input/InputText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  addTodo,
  editTask,
  removeTodo,
  setAllTheTodos,
} from '../fetures/todo/TodoListSlice';
import {
  clearAllData,
  formateDate,
  formatToOriginalDate,
  getData,
  removeData,
  storeData,
} from '../utility/utils';
import {TODO_LIST} from '../utility/constants';

const TodoList: FC = () => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState<Date | string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const data = useAppSelector(state => state.todo.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchDataFromAsyncStorage();
  }, []);

  const fetchDataFromAsyncStorage = async () => {
    const storedTodos = await getData(TODO_LIST);

    console.log('storedTodos', storedTodos);
    if (storedTodos) {
      dispatch(setAllTheTodos(storedTodos));
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleSubmitClick = async () => {
  //   if (!taskName || !date) {
  //     alert('Please enter a task name and select a date.');
  //     return;
  //   }
  //   if (isEditing) {
  //     // Update the task
  //     if (date) {
  //       const data = formateDate(date);
  //       dispatch(editTask({id: editId, taskName, date: data}));
  //     }

  //     const todoList = [
  //       ...data,
  //       {id: editId, taskName, date: formateDate(date)},
  //     ];

  //     // await storeData(TODO_LIST, todoList);
  //     setIsEditing(false);
  //     setEditId(null);
  //   } else {
  //     dispatch(addTodo({date, taskName, id: Date.now().toString()}));
  //     // Store values in asyncStorage
  //     const todoList = [...data, {date, taskName, id: Date.now().toString()}];
  //     // await storeData(TODO_LIST, todoList);
  //   }
  //   setTaskName('');
  //   setDate('');
  // };

  const handleSubmitClick = async () => {
    if (!taskName || !date) {
      alert('Please enter a task name and select a date.');
      return;
    }

    // const formattedDate = moment(date).format('MMM DD, YYYY h:mm A'); // Format the date before saving
    // const formattedDate = moment(new Date(date)).format('MMM DD, YYYY h:mm A');
    // console.log('formattedDate', formattedDate);

    console.log('original Date ==>>', date);
    // console.log('formattedDate Date ==>>', formattedDate);
    if (isEditing) {
      // Update the task
      //   dispatch(editTask({id: editId, taskName, date: formattedDate}));
      dispatch(editTask({id: editId, taskName, date: date}));
      // let filteredData = data?.filter(it => it.id !== editId);
      console.log('date ==============>>>>>>>>>>>>.', date);
      console.log('date ==============>>>>.', typeof date);
      // let indexOfArray = data.findIndex(item => item.id === editId);
      // (data[indexOfArray].date = date),
      //   (data[indexOfArray].id = editId),
      //   (data[indexOfArray].taskName = taskName);
      // const val = data.splice(indexOfArray,1,);
      const updatedData = data.map(item =>
        item.id === editId ? {...item, taskName, date} : item,
      );

      await storeData(TODO_LIST, updatedData);
    } else {
      dispatch(addTodo({taskName, date: date, id: Date.now().toString()}));

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
  //   console.log('task', task);

  //   // setDate(task.date);
  //   console.log(
  //     'formatToOriginalDate(task.date)',
  //     formatToOriginalDate(task.date),
  //   );
  //   // setDate(formatToOriginalDate(task.date));
  //   setDate(task.date);
  //   setEditId(task.id);
  //   setIsEditing(true);
  // };

  const handleEdit = task => {
    setTaskName(task.taskName);
    setEditId(task.id);
    setIsEditing(true);
    // setDate(moment(task.date, 'MMM DD, YYYY h:mm A').toDate()); // Ensure the date is in Date format
    let parsedDate;

    if (
      task.date &&
      moment(task.date, 'MMM DD,<ctrl3348> h:mm A', true).isValid()
    ) {
      // The 'true' makes it strict parsing
      parsedDate = moment(task.date, 'MMM DD,<ctrl3348> h:mm A').toDate();
    } else {
      console.warn('Invalid date format:', task.date); // Log the invalid date for debugging
      parsedDate = new Date(); // Provide a default date
    }

    setDate(parsedDate);
  };

  const handleDeletePress = async (id: number) => {
    dispatch(removeTodo(id));
    const filteredData = data?.filter(obj => obj.id !== id);
    await storeData(TODO_LIST, filteredData);
  };

  const renderTodoList = item => {
    const {id, date, taskName} = item.item ?? {};
    console.log('date', date);
    return (
      <View style={styles.flatListCon}>
        <View style={styles.row}>
          <View style={{flex: 0.8}}>
            <MText style={styles.taskTitle} kind="medium">
              {String(taskName).charAt(0).toUpperCase() +
                String(taskName).slice(1)}
            </MText>
            <MText style={{color: colors.gray}} kind="small">
              {formateDate(date)}
              {/* {date} */}
              {/* {moment(date).format('MMM DD, YYYY h:mm A')} */}
            </MText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              alignItems: 'center',
            }}>
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
          <View style={{}}>
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
                style={{
                  backgroundColor: colors.white,
                  marginTop: hp(2),
                  borderRadius: hp(1),
                  borderColor: colors.borderColor,
                  borderWidth: hp(0.2),
                }}>
                <MText
                  kind="line"
                  style={{
                    paddingVertical: hp(1.5),
                    paddingHorizontal: wp(4),
                  }}>
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
                  console.log('date', date);
                  console.log('setDate', moment(date).format('lll'));
                  // console.log('date', moment(date).format('DD-MM-YYYY'));
                  // setDate(moment(date).format('lll'));
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
    // marginBottom: hp(1),
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
});
