<template>
  <div class="LoginView">
    <a class="LoginViewTitle">用户登录</a>
    <el-form ref="ruleFormRef" label-position="top" label-width="auto" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.userName" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" @keydown.enter="submitForm(ruleFormRef!)"
          @keydown.tab="submitForm(ruleFormRef!)" />
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-popover :visible="visible" placement="top" :width="160">
        <p>你确定吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false">取消</el-button>
          <el-button size="small" type="primary" @click="confirmResetForm()">
            确定
          </el-button>
        </div>
        <template #reference>
          <el-button @click="visible = true">重置</el-button>
        </template>
      </el-popover>
      <el-button type="primary" @click="register()">
        注册
      </el-button>
      <el-button type="primary" :loading="loginLoading" @click="submitForm(ruleFormRef!)">
        登录
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { LoginParams } from '@/types/user';
import { ElMessage, type FormInstance } from 'element-plus';
import { reactive, ref, useTemplateRef } from 'vue';

const userStore = useUserStore();

const ruleFormRef = useTemplateRef<FormInstance>('ruleFormRef')
const formLabelAlign = reactive<LoginParams>({
  userName: '',
  password: '',
})

const visible = ref<boolean>(false)
const loginLoading = ref<boolean>(false)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        loginLoading.value = true
        await userStore.Login(formLabelAlign);
      } finally {
        loginLoading.value = false
      }
    } else {
      console.log('error submit!')
    }
  })
}

const confirmResetForm = () => {
  visible.value = false
  resetForm(ruleFormRef.value!)
  ElMessage.success('重置成功！')
}

const resetForm = (formEl: FormInstance | undefined) => {
  formLabelAlign.userName = ''
  formLabelAlign.password = ''
  if (!formEl) return
  formEl.resetFields()

}

const register = () => {
  ElMessage('注册功能即将开放，请稍后...')
}

</script>

<style lang="scss" scoped>
.LoginView {
  @include mobile {
    padding: 4vh 6vw 0;
  }

  .LoginViewTitle {
    font-size: 7vw;
    font-weight: 600;
    margin-bottom: 3vw;
    display: block;

    @include pc {
      display: none;
    }
  }
}
</style>
