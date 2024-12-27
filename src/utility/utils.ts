import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const storeData = async (key, value) => {
    try {
        if (!value) return;
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.log('\n\n error in storing data to AsyncStorage', error);
    }
};

export const getData = async key => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log('\n\n error in getting data from AsyncStorage', error);
    }
};

export const removeData = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('\n\n error in getting data from AsyncStorage', error);
    }
};

export const clearAllData = async () => {
    try {

        await AsyncStorage.getAllKeys().then(keys => {
            keys.forEach(key => {
                // if (key != FCM_TOKEN) AsyncStorage.removeItem(key);
                AsyncStorage.removeItem(key);
            });
        });
    } catch (error) {
        console.log('\n\n error in getting data from AsyncStorage', error);
    }
};

export const formateDate = (date: string | Date) => moment(date).format('lll')