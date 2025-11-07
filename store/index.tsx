import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice, authSlice} from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    [counterSlice.name]:counterSlice.reducer,
    [authSlice.name]:authSlice.reducer
}))

export const store = configureStore({
    reducer: persistedReducer,
  });
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch