import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware" ;

export const store = new MMKV({
  id: "cart-storage",
  encryptionKey: "store",
});

export const zustandStorage: StateStorage = {
  getItem: async (name) => {
    const value = store.getString(name);
    return value ? JSON.parse(value) : undefined;
  },
  setItem: async (name, value) => {
    store.set(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    store.delete(name);
  },
};
