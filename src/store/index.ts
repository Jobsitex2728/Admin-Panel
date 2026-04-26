import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import authReducer from './authSlice'

// Import all injected endpoints to register them
import './api/authApi'
import './api/dashboardApi'
import './api/usersApi'
import './api/driversApi'
import './api/jobsApi'
import './api/truckTypesApi'
import './api/withdrawalsApi'
import './api/cmsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
