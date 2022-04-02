import { createSlice } from '@reduxjs/toolkit';

interface AuthorizationSlice {
  bearerToken: string | undefined;
  refreshToken: string | undefined;
  isAuthorized: boolean;
  userId: number;
  fingerprintId: number;
  email: string | undefined;
  role: string | undefined;
}

const initialState: AuthorizationSlice = {
  isAuthorized: false,
} as AuthorizationSlice;

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorizedUser: (state, action) => {
      const { accessToken, id, email, fingerprintId, role, refreshToken } =
        action.payload;
      state.bearerToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = id;
      state.email = email;
      state.fingerprintId = fingerprintId;
      state.role = role;
      state.isAuthorized = true;
    },
    clearUserState: (state) => initialState,
  },
});

export const { setAuthorizedUser, clearUserState } = authorizationSlice.actions;
export default authorizationSlice;
