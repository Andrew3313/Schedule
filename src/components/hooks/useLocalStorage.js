import { useCallback, useState } from "react";
import { create } from "zustand";

const id = Telegram.WebApp.initDataUnsafe.user?.id || 0;

const useLocalStorageData = create((set) => ({
  data: JSON.parse(localStorage[id] || "{}"),
  setData: (data) => set({ data }),
}));

export const useLocalStorage = () => {
  const { data, setData } = useLocalStorageData();

  const getItem = useCallback(
    (key) => {
      return data[key];
    },
    [data]
  );

  const setItem = useCallback((key, value) => {
    data[key] = value;
    setData(data);
    localStorage[id] = JSON.stringify(data);
  }, []);

  return [getItem, setItem];
};
