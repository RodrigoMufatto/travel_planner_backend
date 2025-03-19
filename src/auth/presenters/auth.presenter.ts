import {
  SignInServiceOutputInterface,
  SignUpServiceOutputInterface,
} from '../application/auth.service.interface';

export class SignInPresenter {
  accessToken: string;

  constructor(signIn: SignInServiceOutputInterface) {
    this.accessToken = signIn.accessToken;
  }
}

export class SignUpPresenter {
  id: string;

  constructor(signUp: SignUpServiceOutputInterface) {
    this.id = signUp.id;
  }
}
