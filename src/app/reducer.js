import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {}
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
//   lists of functions that can update the redux states
  reducers: {
    dispatchProfile: (state, action) => {
        state.profile = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { dispatchProfile } = counterSlice.actions

export default counterSlice.reducer