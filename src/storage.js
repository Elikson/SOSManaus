import AsyncStorage from '@react-native-community/async-storage';

export async function storeData (key, value){
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

export async function getData(key){
    var data = null
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      data = jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
    return data
  }
  
