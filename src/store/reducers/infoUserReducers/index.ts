import { UserNegative } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Modelo para ser inserindo ao redux
interface UserInfoState {
  userInfo: {
    data: UserNegative,
    uidCart: string,
    uidUser: string,
  };
}

// Valor inicial mo modelo criado
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
    // Função responsável por verificar se os dados são validos para serem armazenados
    setUserInfoAction: (state, action: PayloadAction<UserInfoState>) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setUserInfoAction } = userInfo.actions;

export default userInfo.reducer;
