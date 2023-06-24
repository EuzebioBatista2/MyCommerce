import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPerfilLogin {
  user?: UserType;
}

const initialState: IPerfilLogin = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'userPerfilReducer',
  initialState,
  reducers: {
    setUserPerfilAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserPerfilAction } = userSlice.actions;

export default userSlice.reducer;
