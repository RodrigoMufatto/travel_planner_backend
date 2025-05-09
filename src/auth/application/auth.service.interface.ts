export interface SignUpServiceInputInterface {
  email: string;
  password: string;
  username: string;
  birthdate: string;
  phone: string;
}

export interface SignUpServiceOutputInterface {
  id: string;
}

export interface SignInServiceInputInterface {
  email: string;
  password: string;
}

export interface SignInServiceOutputInterface {
  accessToken: string;
}
