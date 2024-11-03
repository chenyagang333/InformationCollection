// src/services/login.ts

import request from "@/services/http/request";
import type { CreateFormCommand, Form } from "@/types/Form";

/**
 * 创建问卷
 * @param data 请求参数
 */
export const postForm = (data: CreateFormCommand) => {
  return request.post<boolean>('forms/create', data)
}

/**
 * 创建问卷
 * @param data 请求参数
 */
export const getForm = (pageNumber: number, pageSize: number, keyword?: string) => {
  return request.get<Form[]>('/forms', { params: { pageNumber, pageSize, keyword } })
}



