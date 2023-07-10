import { UserNegative } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
  userInfo: {
    data: UserNegative,
    uidCart: string,
    uidUser: string,
  };
}

const initialState: UserInfoState = {
  userInfo: {
    data: {
      name: '',
      phone: ''
    },
    uidCart: '',
    uidUser: ''
  }
};

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfoAction: (state, action: PayloadAction<UserInfoState>) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setUserInfoAction } = userInfo.actions;

export default userInfo.reducer;
