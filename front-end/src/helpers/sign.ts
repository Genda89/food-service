export const isValidEmail = (email: string) => email && /^[^ ]+@[^ ]+\.[a-zA-Z]{2,6}$/.test(email);
export const isValidPassword = (password: string) =>
  password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password);
