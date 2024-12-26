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
  formateDate,
  formatToOriginalDate,
  getData,
  storeData,
} from '../utility/utils';
import {TODO_LIST} from '../utility/constants';

const Todo: FC = () => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState<Date | string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const data = useAppSelector(state => state.todo.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchDataFromAsyncStorage();
  }, []);

  const fetchDataFromAsyncStorage = async () => {
    const storedTodos = await getData(TODO_LIST);

    console.log('storedTodos', storedTodos);
    if (storedTodos) {
      console.log('hello');
      // const parsTodos = JSON.parse(storeData);
      // console.log('hello2');
      // dispatch(setAllTheTodos(storedTodos));
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmitClick = async () => {
    if (!date) {
      alert('Please enter a task name and select a date.');
      return;
    }

    // const formattedDate = moment(date).format('MMM DD, YYYY h:mm A'); // Format the date before saving
    const formattedDate = moment(new Date(date)).format('MMM DD, YYYY h:mm A');

    // console.log('original Date ==>>', date);
    // console.log('formattedDate Date ==>>', formattedDate);
    if (isEditing) {
      // Update the task
      dispatch(editTask({id: editId, taskName: 'Gopi', date: date}));
    } else {
      dispatch(
        addTodo({
          taskName: 'RadheOrginal',
          date: date,
          id: Date.now().toString(),
        }),
      );
    }

    setTaskName('');
    setDate('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = task => {
    console.log('task', task);
    setTaskName(task.taskName);
    setEditId(task.id);
    setIsEditing(true);
    setDate(task.date);
    // setDate(moment(task.date, 'MMM DD, YYYY h:mm A').toDate());
    // setDate(moment(new Date(task.date)).format());
    // setDate(task.date);
    // setDate(moment(task.date, 'MMM DD, YYYY h:mm A').toDate()); // Ensure the date is in Date format
  };

  const handleDeletePress = async (id: number) => {
    dispatch(removeTodo(id));
    const filteredData = data?.filter(obj => obj.id !== id);
    // await storeData(TODO_LIST, filteredData);
  };

  const renderTodoList = item => {
    const {id, date} = item.item ?? {};
    console.log(date);
    return (
      <View style={styles.flatListCon}>
        <View style={styles.row}>
          <View style={{flex: 0.8}}>
            <MText style={{color: colors.gray}} kind="small">
              {/* {formateDate(date)} */}
              {date}

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
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{}}>
            <View style={{marginHorizontal: wp(4)}}>
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
                mode="date"
                isVisible={isDatePickerVisible}
                onConfirm={date => {
                  console.log('Bro this is a selected date =>', date);
                  //   console.log('setDate', moment(date).format('lll'));
                  // console.log('date', moment(date).format('DD-MM-YYYY'));
                  setDate(moment(date).format('l'));
                  //   setDate(date);
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

export default Todo;

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
