import type { Entity } from "@/types/entity";

type Item = { color: string; label: string }



export interface Form {
  id: number;
  createTime: string;
  userId: number;
  title: string | null;
  subTitle: string | null;
  publish: boolean;
  count: number
  type: Item | null;
}

export interface FormDTO {
  Form: Form;
  items: FormItem[]
}


export interface FormItem extends Entity {
  userId: number;
  formId: number;
  order: number;
  label: string | null;
  type: string | null;
}

export interface CreateFormCommand {
  title: string | null;
  subTitle: string | null;
  publish: boolean;
  items: CreateFormItem[];
}

export interface CreateFormItem {
  order: number;
  label: string | null;
  type: string | null;
}


export interface ApplicationScenario {
  iconComponent: string;
  iconColor: string;
  title: string;
  subTitle: string;
  description: string;
}

export type FormTemplateTabs = Array<FormTemplateTab>

export type FormTemplateTab = {
  title: string,
  list: Array<FormTemplate>
}
export type FormTemplate = {
  id: number,
  title: string,
  count: number,
}
