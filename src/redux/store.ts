import { configureStore } from "@reduxjs/toolkit";
import tasks from './task.reducer'
import finishedTasks from './finished-task.reducer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  
};
const persistedReducer = persistReducer(persistConfig, tasks)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;