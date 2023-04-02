import {UserLoginResponse} from "./user-login-response";

export interface LoginResponse {
  token: string;
  user: UserLoginResponse;
}
