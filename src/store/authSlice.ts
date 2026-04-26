import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, AuthUser } from '@/types/auth'

const stored = localStorage.getItem('auth')
const initial: AuthState = stored
  ? (JSON.parse(stored) as AuthState)
  : { user: null, accessToken: null, refreshToken: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser; accessToken: string; refreshToken: string }>) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('auth', JSON.stringify(state))
    },
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('auth', JSON.stringify(state))
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('auth')
    },
  },
})

export const { setCredentials, setTokens, logout } = authSlice.actions
export default authSlice.reducer
