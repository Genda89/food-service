export const ROUTES: { [key: string]: string } = {
  HOMEPAGE: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  AUTH_LOGIN: 'auth/login',
  USER_REGISTER: 'user/register'
};

export const STATUS_CODES: { [key: string]: number } = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409
};

export enum LANGUAGES {
  'hu-HU' = 'Hungarian',
  'en-US' = 'English'
}

export const INVALID = 'invalid';
export const NOT_MATCH = 'register.form.password.not.match';
export const REGISTER_AS_ADMIN = 'register.form.isadmin';
export const REGISTRATION_FAILED = 'register.error.failed';
export const ADMIN = 'admin';
export const USER = 'user';
