import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      items: {},
      setItems: (newItems) => set((state) => ({ items: { ...state.items, ...newItems } })),
    }),
    {
      name: 'agenda-storage', // Nom de la clé de stockage
      getStorage: () => AsyncStorage,
    }
  )
);

export default useStore;
