export type AuthLoginInput = {
  email: string;
  password: string;
};

export type UserCreateInput = {
  email: string;
  name: string;
  password: string;
};

export type Contact = {
  uuid: string;
  name: string;
};
