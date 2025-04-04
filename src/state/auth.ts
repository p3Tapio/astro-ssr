import { atom } from "nanostores";
import type { AuthState } from "types/auth";

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const authStore = atom<AuthState>(initialState);

export const setAuthState = (state: AuthState) => {
  authStore.set(state);
};
