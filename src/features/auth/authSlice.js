import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: state => {
      state.value = true
      console.log('auth from slice')
    },
    deauthorize: state => {
      state.value = false
      console.log('deauth from slice')
    },
  },
})

// Action creators are generated for each case reducer function
export const { authorize, deauthorize } = authSlice.actions

export default authSlice.reducer
