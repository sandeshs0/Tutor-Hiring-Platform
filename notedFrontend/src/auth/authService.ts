const ACCESS_TOKEN_KEY = 'accessToken';
const USER_ID_KEY = 'userId';
const USER_NAME_KEY = 'userName';

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
};

export const doLogin = (token: string, userId: string, userName: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(USER_NAME_KEY, userName);
};

export const doLogout = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
};

export const isAuthenticated = (): boolean => {
  return isLoggedIn();
};