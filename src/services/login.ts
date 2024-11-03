// src/services/login.ts

import type { LoginParams, LoginResult } from "@/types/user"
import request from "@/services/http/request";

/**
 * 用户登录
 * @param data 请求参数
 */
export const postLogin = (data: LoginParams) => {
  return request.post<LoginResult>('users/login', data)
}

