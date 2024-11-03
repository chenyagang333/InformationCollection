<template>
  <div class="InformationCollectionView">
    <h3>{{ form.title }}</h3>
    <h4>{{ form.subTitle }}</h4>
    <el-form label-position="top" label-width="auto" style="max-width: 600px">
      <template v-for="i in formItemsView" :key="i.id">
        <el-form-item :label="i.label">
          <el-input v-model="i.value" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { Form } from '@/apis/model/FormDTO/Form';
import type { FormDTO } from '@/apis/model/FormDTO/FormDTO';
import type { CreateFormRecordItem } from '@/types/command/CreateFormRecordCommand ';
import { computed, ref } from 'vue'


const form = ref<Form>({} as Form);
const formItems = ref<CreateFormRecordItem[]>([
  {
    order: 1,
    label: '姓名',
    value: 'chenyagang',
  },
  {
    order: 2,
    label: '手机号',
    value: '17796826259',
  },
]);
const formItemsView = computed<CreateFormRecordItem[]>(() => {
  return [...formItems.value].sort((a, b) => a.order - b.order)
});
</script>

<style scoped></style>
