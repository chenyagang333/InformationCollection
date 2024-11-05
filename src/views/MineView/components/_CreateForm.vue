<template>
  <el-form ref="ruleFormRef" label-position="top" label-width="auto">
    <el-form-item label="标题">
      <el-input v-model="addForm.title" placeholder="请输入问卷标题，可为空" />
    </el-form-item>
    <el-form-item label="二级标题">
      <el-input v-model="addForm.subTitle" placeholder="请输入问卷二级标题，可为空" />
    </el-form-item>
    <!-- 问题列表 -->
    <template v-for="(i, index) in addForm.items" :key="i.order">
      <el-form-item :label="`问题${index + 1}`">
        <template #label>
          <el-input v-model="i.label" :placeholder="`请输入题目${index + 1}`" size="small" />
        </template>
        <el-input v-model="i.label" :placeholder="`请输入问题${index + 1}`" />
        <div class="add-form-item-options">
          <el-button class="mt-2" @click.prevent="">
            上移
          </el-button>
          <el-button class="mt-2" @click.prevent="">
            下移
          </el-button>
          <el-popconfirm width="220" icon="InfoFilled" icon-color="#626AEF" title="你确定删除该问题？"
            @confirm="removeAddFormItem(i)">
            <template #reference>
              <el-button type="danger" plain class="mt-2" @click.prevent="">
                删除
              </el-button>
            </template>
            <template #actions="{ confirm, cancel }">
              <el-button size="small" @click="cancel">No!</el-button>
              <el-button type="danger" size="small" @click="confirm">
                Yes?
              </el-button>

            </template>
          </el-popconfirm>
        </div>
      </el-form-item>
    </template>
  </el-form>
  <el-form-item>
    <el-popconfirm width="220" icon="InfoFilled" icon-color="#626AEF" title="你确定取消创建此问卷？" @confirm="cancelCreateForm">
      <template #reference>
        <el-button type="danger">
          取消创建
        </el-button>
      </template>
      <template #actions="{ confirm, cancel }">
        <el-button size="small" @click="cancel">No!</el-button>
        <el-button type="danger" size="small" @click="confirm">
          Yes?
        </el-button>

      </template>
    </el-popconfirm>
    <el-button type="primary" @click="createForm">
      点击创建问卷
    </el-button>
    <el-button type="success" plain @click="addCreateFormItems()">
      添加题目
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import type { CreateFormCommand, CreateFormItem } from '@/types/Form';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { postForm } from '@/services/form';

const addForm = ref<CreateFormCommand>({ title: '', subTitle: '', publish: true, items: [] as CreateFormItem[] } as CreateFormCommand)

const createForm = async () => {
  addForm.value.items.forEach((x, index) => {
    x.order = index;
    x.type = "input"
  })
  const res = await postForm(addForm.value)
}

const addCreateFormItems = () => {
  addForm.value.items.push({

  })
}

const subtractCreateFormItems = () => {
  if (addForm.value.items.length === 1) {
    ElMessage.error('问卷中至少填写一个问题'); return;
  }
  addForm.value.items.length = addForm.value.items.length - 1
}

const cancelCreateForm = () => {
  addForm.value.items = []
}

const removeAddFormItem = (item: CreateFormItem) => {
  const index = addForm.value.items.indexOf(item)
  if (index !== -1) {
    addForm.value.items.splice(index, 1)
  }
}

</script>

<style scoped></style>
