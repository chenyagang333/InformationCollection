import type { Entity } from "@/types/entity";



export interface Form extends Entity {
  userId: number;
  title: string | null;
  subTitle: string | null;
  publish: boolean;
  count: number
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
