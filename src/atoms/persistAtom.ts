import AsyncStorage from "@react-native-async-storage/async-storage";
import {AtomEffect, DefaultValue} from "recoil";

export function persistAtom<T>(key: string): AtomEffect<T> {
  return ({setSelf, onSet}) => {
    AsyncStorage.getItem(key, (err, savedValue) => {
      if (!err && typeof savedValue === 'string') {
        setSelf(JSON.parse(savedValue));
      }
    })

    onSet((newValue, _, isReset) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
