import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define a type for the slice state
interface AuthState {
  sliderShown: boolean,
  isSingin: boolean,
  authSkiped: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  sliderShown: false,
  isSingin: false,
  authSkiped: false
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSliderShown: (state) => {
      state.sliderShown = true
    },
    setSigin: (state, action: PayloadAction<boolean>) => {
      console.log(action,"action")
      state.isSingin = action.payload
    },
  },
})

export const { setSliderShown,setSigin } = authSlice.actions


export default authSlice.reducer