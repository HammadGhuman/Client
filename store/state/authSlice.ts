import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'


// Define a type for the slice state
interface AuthState {
  access_token:string|null;
  fullName:string|null;
  email:string|null;
  id:string|null;
  type:string|null;
}

// Define the initial state using that type
const initialState: AuthState = {
  access_token:null,
  fullName:null,
  email:null,
  id:null,
  type:null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
      console.log("(AuthState)=======",state);
    },
  },
})

export const {login } = authSlice.actions;

export default authSlice.reducer