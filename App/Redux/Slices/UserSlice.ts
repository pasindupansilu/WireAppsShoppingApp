import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
