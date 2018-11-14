import { AsyncStorage } from 'react-native';

const UIDKEYS = {
    urlServer: 'UID001',
    userLogin: 'UID002',
    userPass: 'UID003'
};

export const getUIDKey = (value) => UIDKEYS[value];

export const dispatchStorageKey = async (key, dispatch, type) => {
    try {
        const storageValue = await AsyncStorage.getItem(getUIDKey(key));
        if (storageValue) {
            dispatch({
                type,
                payload: storageValue
            });
        }
    } catch (e) {
        console.error(`erro ao acessar storage para a chave ${key}`);
    }
};

export const setStorageKey = async (key, value) => {
    try {
        AsyncStorage.setItem(getUIDKey(key), value);
    } catch (e) {
        console.error(`erro ao atribuir ao storage a chave ${key}`);
    }
};


export const getStorageKey = async (key) => {
    try {
        const storageValue = await AsyncStorage.getItem(getUIDKey(key));
        if (storageValue) {
            return storageValue;
        }

        return '';
    } catch (e) {
        console.error(`erro ao acessar storage para a chave ${key}`);
    }
};
