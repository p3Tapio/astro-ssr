interface BaseUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: BaseUser | null;
  isLoggedIn: boolean;
  token: string | null;
}
