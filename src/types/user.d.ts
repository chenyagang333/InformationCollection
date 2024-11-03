export type LoginParams = {
  userName: string
  password: string
}

export interface LoginResult {
  success: boolean;
  token: string;
}
