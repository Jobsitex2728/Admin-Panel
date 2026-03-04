import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import dashboardReducer from './features/dashboard/dashboardSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './services/baseApi';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [baseApi.reducerPath]: baseApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

