<template>
  <div class="login">
    <img
      src="http://static.wrinternet.goldwind.com.cn/logo-goldwind/gold-en-level-white.svg"
      class="logo"
    >
    <div class="login-content">
      <div class="content-logo">
        <div style="">
          <img src="http://static.wrinternet.goldwind.com.cn/logo-goldwind/gold-shape-white.svg">
        </div>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="loginObj"
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
        status-icon
      >
        <div class="login-title">
          {{ title }}
        </div>
        <el-form-item
          label=""
          prop="userName"
        >
          <el-input
            v-model="loginObj.userName"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item
          label=""
          prop="password"
        >
          <el-input
            type="password"
            v-model="loginObj.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submitForm(ruleFormRef)"
            type="primary"
          >
            {{ btnName }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { validateUserName, validatePassword } from '@/utils/validate'
import { requestServiceApi } from '@/utils/request-util'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { setToken, setLocal } from '@/utils/auth'

const ruleFormRef = ref<FormInstance>()

const loginObj = reactive({
  userName: '',
  password: ''
})
const router = useRouter()
const route = useRoute()
const title = ref('登录到您的账号')
const btnName = ref('登录')

if (route.name !== 'login') {
  title.value = '注册账号'
  btnName.value = '注册'
}

const rules = reactive<FormRules>({
  userName: [
    { required: true, validator: validateUserName, trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ]
})

const login = () => {
  requestServiceApi(
    '',
    '',
    'login',
    loginObj,
    (res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
        // 存token到cookies
        setToken(res.data.token)
        setLocal('GoldMap-userName', res.data.userName)
        router.push('/GOLDMAP-ServerControl')
      } else {
        ElMessage({
          type: 'error',
          message: res.message
        })
      }
    },
    null
  )
}

const register = () => {
  requestServiceApi(
    '',
    '',
    'addUser',
    loginObj,
    (res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '注册成功'
        })
        router.push('/GOLDMAP-ServerControl')
      } else {
        ElMessage({
          type: 'error',
          message: res.message
        })
      }
    },
    null
  )
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (route.name === 'login') {
        login()
      } else {
        register()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-image: url('http://static.wrinternet.goldwind.com.cn/login/bg.jpg');
  background-repeat:no-repeat;
  background-size: 100% 100%;
  -moz-background-size:100% 100%;
  background-position:20%;
  .logo{
    height:24px;
    margin: 24px 0 0 40px;
  }
  .login-content{
    width: 340px;
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 170px);
    background: #fff;
    border-radius: 46px;
    .el-form{
      border-radius: 16px;
      background: #fff;
      padding: 32px;
      .login-title{
        margin: 10px auto 20px auto;
        text-align: left;
        color: #545454;
        font-size: 20px;
        font-weight: 500;
      }
      .el-input{
        height: 40px;
        :deep(.el-input__wrapper){
          border-radius: 10px;
        }
      }
      .el-button{
        width: 100%;
        padding: 20px 20px;
        line-height: 4px !important;
        font-size: 14px;
        border-style: none;
        color: #fff;
        background: #2F58A0;
        box-shadow: 0px 4px 10px 0px rgba(47,88,160,0.5);
        border-radius: 10px;
        border-color: #1890ff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
      }
    }
    .content-logo{
      position: absolute;
      top: -43px;
      left:110px;
      width: 120px;
      height: 86px;
      border-radius: 43px;
      background:#fff;
      div{
        border-radius: 33px;
        background-color: #2F58A0;
        width: 100px;
        height: 66px;
        margin: 8px 0 0 10px;
        box-shadow: 0px 4px 8px 0px rgba(47,88,160,0.4);
        img{
          width:46px;
          height: 46px;
          margin:10px 27px;
        }
      }
    }
  }
}
</style>
