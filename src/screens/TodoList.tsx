import moment from 'moment';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Container} from '../components/background/Container';
import Input from '../components/input/InputText';
import CreateTodoModal from '../components/modal/CreateTodoModal';
import MText from '../components/text/MText';
import {
  addTodo,
  editTask,
  removeTodo,
  setAllTheTodos,
} from '../fetures/todo/TodoListSlice';
import colors from '../utility/colors';
import {TODO_LIST} from '../utility/constants';
import fonts from '../utility/fonts';
import images from '../utility/images';
import {formateDate, getData, storeData} from '../utility/utils';

const TodoList: FC = () => {
  const timer = useRef(null);

  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState<Date | string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const [isModalVisible, setModalVisible] = useState<boolean>();

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
    setModalVisible(false);
  };

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
    setModalVisible(true);
  };

  const deleteAlert = id =>
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        style: 'default',
        onPress: () => handleDeletePress(id),
        text: 'Delete',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled clicked'),
        style: 'cancel',
      },
    ]);

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
                // handleDeletePress(id);
                deleteAlert(id);
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

  const emptyTodoListComponent = () => {
    return (
      <View style={styles.emptyTodoComponentCon}>
        <MText style={styles.title}>No Todo List Found</MText>
        <MText style={[styles.submitText, , styles.addTodoNoteText]}>
          Add Todo Note Please
        </MText>
      </View>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={styles.con}>
        <MText style={styles.title} kind="h2">
          Task List
        </MText>
      </View>
    );
  };

  return (
    <Container>
      <View style={styles.container}>
        <View>
          <View style={styles.flatList}>
            <FlatList
              data={data}
              ListHeaderComponent={listHeaderComponent}
              keyExtractor={item => item.id}
              renderItem={renderTodoList}
              ListEmptyComponent={emptyTodoListComponent}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.fabIconCon}
          onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircle" style={styles.plus} />
        </TouchableOpacity>
      </View>
      <CreateTodoModal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setTaskName('');
          setDate('');
          setIsEditing(false);
          setEditId(null);
        }}
        isBackDropPressClose={false}
        isCrossRequired={true}
        title={'Add Task'}
        headerConStyle={{paddingVertical: hp(1.5)}}>
        <View style={{}}>
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
            <MText style={styles.submitText} kind="h3">
              Submit
            </MText>
          </TouchableOpacity>
        </View>
      </CreateTodoModal>
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
    fontFamily: fonts.rubikBold,
  },

  flatListCon: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: colors.white,
    marginVertical: hp(1),
    borderRadius: hp(1),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  submitCon: {
    backgroundColor: colors.tileBackGroundColor2,
    marginVertical: hp(2),
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: hp(1),
  },
  submitText: {
    fontSize: hp(2.5),
    textDecorationLine: 'underline',
    color: colors.white,
    fontFamily: fonts.rubikMedium,
  },
  taskTitle: {
    fontFamily: fonts.rubikMedium,
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
    fontFamily: fonts.rubikMedium,
  },
  markAsCompletedCon: {flex: 0.1, justifyContent: 'center'},
  addTodoNoteText: {
    fontSize: hp(2),
    textAlign: 'center',
    marginTop: hp(1),
  },
  emptyTodoComponentCon: {
    height: hp(80),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIconCon: {position: 'absolute', bottom: 20, right: 30},
  plus: {
    fontSize: hp(5.5),
    color: colors.red,
    backgroundColor: 'white',
    borderRadius: hp(15),
  },
  container: {flex: 1},
  flatList: {marginHorizontal: wp(4)},
});
