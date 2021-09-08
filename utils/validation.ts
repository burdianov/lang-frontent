export const isEmpty = (value: string) => {
  if (!value) return true;
  return false;
};

export const isEmail = (email: string) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isLength = (password: string) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) return true;
  return false;
};
