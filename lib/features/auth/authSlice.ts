import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthTokens, User } from '@/lib/types';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'refresh_token';

const getCookie = (key: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return Cookies.get(key) ?? null;
};

const setCookie = (key: string, value: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.set(key, value, { expires: 7 });
};

const removeCookie = (key: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.remove(key);
};

const initialAccessToken = getCookie(ACCESS_TOKEN_COOKIE_KEY);
const initialRefreshToken = getCookie(REFRESH_TOKEN_COOKIE_KEY);

const initialState: AuthState = {
  user: null,
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  isAuthenticated: Boolean(initialAccessToken),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      setCookie(ACCESS_TOKEN_COOKIE_KEY, action.payload.accessToken);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, action.payload.refreshToken);
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(state.accessToken);
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User } & AuthTokens>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      setCookie(ACCESS_TOKEN_COOKIE_KEY, action.payload.accessToken);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      removeCookie(ACCESS_TOKEN_COOKIE_KEY);
      removeCookie(REFRESH_TOKEN_COOKIE_KEY);
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setTokens, setUser, setCredentials, logout, updateUser } =
  authSlice.actions;
export default authSlice.reducer;

