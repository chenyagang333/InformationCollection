// src/services/login.ts

import request from "@/services/http/request";
import type { CreateFormCommand, Form, FormTemplateTabs } from "@/types/Form";
import type { SelectTheApplicationScenarioItemType } from "@/views/MineView/type";

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


/**
 * 获取应用场景
 */
export const getApplicationScenario = () => {
  return request.get<SelectTheApplicationScenarioItemType[]>('/getApplicationScenario')
}

/**
 * 获取问卷模板
 */
export const getFormTemplate = (id: number, search?: string) => {
  return request.get<FormTemplateTabs>('/getFormTemplate', { params: { id, search } })
}

