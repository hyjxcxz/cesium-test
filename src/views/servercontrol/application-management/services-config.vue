<template>
  <div class="set-up">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item
        label="项目名称:"
        prop="subject"
      >
        <span v-if="props.title === '修改应用'">{{ ruleForm.subject }}</span>
        <el-input
          v-else
          v-model="ruleForm.subject"
        />
      </el-form-item>
      <el-form-item
        label="服务key:"
        v-if="props.title === '修改应用'"
      >
        {{ ruleForm.apiKey }}
      </el-form-item>
      <el-form-item
        label="启用服务:"
        prop="serverSimpleInfos"
      >
        <div class="checkbox-box">
          <el-divider>
            基础服务
          </el-divider>
          <el-checkbox-group v-model="ruleForm.serverSimpleInfos">
            <el-checkbox
              v-for="item in serviceList.info"
              :key="item.id"
              :label="item.id"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item
        label="有效日期:"
        prop="validTime"
      >
        <el-date-picker
          v-model="ruleForm.validTime"
          type="date"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="选择日期"
          :disabled-date="pickerOptions"
        />
      </el-form-item>
      <el-form-item
        label="请求校验方式:"
        prop="requestCheckType"
      >
        <el-select
          v-model="ruleForm.requestCheckType"
          placeholder="请选择"
        >
          <el-option
            label="IP白名单校验"
            value="IP白名单校验"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="IP白名单:"
        prop="whiteLists"
      >
        <el-input
          v-model="ruleForm.whiteLists"
          autosize
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="props.title === '服务申请'"
          @click="resetForm(ruleFormRef)"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
    <Result
      v-if="isResult"
      :title="props.title === '修改应用' ? '修改成功' : '提交成功'"
      :sub-title="'我们会尽快处理此问题，请耐心等待…'"
      @go-back="goback"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { requestServiceApi } from '@/utils/request-util'
import Result from '@/components/utils/result-component.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  projectInfo: {
    type: Object,
    default () {
      return {}
    }
  }
})

const emits = defineEmits(['go-back'])

const goback = () => {
  emits('go-back')
}

const isResult = ref(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  subject: '',
  apiKey: '',
  requestCheckType: 'IP白名单校验',
  validTime: '',
  serverSimpleInfos: [],
  whiteLists: ''
})
// 限制日期选择
const pickerOptions = (time: any) => {
  let nowData = new Date()
  nowData = new Date(nowData.setDate(nowData.getDate() - 1))
  return time < nowData
}

interface SeavicesList<T> {
  info?: T
}
interface SeavicesObj {
  name: string,
  id: string
}

const serviceList:SeavicesList<SeavicesObj[]> = reactive({
  info: []
})
// 项目名称校验规则
const validateName = (rule: any, value: any, callback: any) => {
  const reg = '^[\u4E00-\u9FA5A-Za-z0-9_-]+$'
  if (value === '') {
    callback(new Error('请输入项目名称'))
  } else if (value.length > 20) {
    callback(new Error('长度不可超过20个字符'))
  } else if (!value.match(reg)) {
    callback(new Error('允许输入中文,英文,数字，‘-’和‘_’'))
  } else {
    callback()
  }
}

// IP校验规则
const validateIP = (rule: any, value: any, callback: any) => {
  // eslint-disable-next-line no-useless-escape
  const reg = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$'
  if (value === '') {
    callback(new Error('请输入IP'))
  } else if (value.indexOf(',')) {
    const list = value.split(',')
    if (list.some((item:string) => !item.match(reg))) {
      callback(new Error('请正确输入IP并用英文半角逗号分隔隔开'))
    } else {
      callback()
    }
  } else if (!value.match(reg)) {
    callback(new Error('请正确输入IP并用英文半角逗号分隔隔开'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  subject: [
    { required: true, validator: validateName, trigger: 'blur' }
  ],
  requestCheckType: [
    {
      required: true,
      message: '请选择校验方式',
      trigger: 'change'
    }
  ],
  serverSimpleInfos: [
    {
      type: 'array',
      required: true,
      message: '请选择要启用的服务',
      trigger: 'change'
    }
  ],
  validTime: [
    {
      type: 'date',
      required: true,
      message: '请选择有效日期',
      trigger: 'change'
    }
  ],
  whiteLists: [
    { required: true, validator: validateIP, trigger: 'blur' }
  ]
})

const getServerSimpleList = () => {
  requestServiceApi(
    '',
    '',
    'getServerSimpleList',
    null,
    (res: any) => {
      serviceList.info = res.data
    },
    null
  )
}

getServerSimpleList()

const getProjectDetail = () => {
  requestServiceApi(
    '',
    '',
    'getProjectDetail',
    null,
    (res: any) => {
      ruleForm.subject = res.data.subject
      ruleForm.apiKey = res.data.apiKey
      ruleForm.requestCheckType = res.data.requestCheckType
      ruleForm.validTime = res.data.validTime
      ruleForm.serverSimpleInfos = res.data.serverSimpleInfos
      ruleForm.whiteLists = res.data.whiteLists.join(',')
    },
    [props.projectInfo.id]
  )
}
if (props.title === '修改应用') {
  getProjectDetail()
}
// 申请服务
const applyKey = () => {
  const data = {
    openServerIds: ruleForm.serverSimpleInfos,
    subject: ruleForm.subject,
    validTerm: ruleForm.validTime,
    whiteLists: ruleForm.whiteLists.split(','),
    requestCheckType: ruleForm.requestCheckType
  }
  requestServiceApi(
    '',
    '',
    'applyKey',
    data,
    (res: any) => {
      if (res.code === 200) {
        isResult.value = true
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
          duration: 3000
        })
      }
    },
    null
  )
}
// 更新服务
const updateProjectInfo = () => {
  const data = {
    projectId: props.projectInfo.id,
    openServerIds: ruleForm.serverSimpleInfos,
    subject: ruleForm.subject,
    validTerm: ruleForm.validTime,
    whiteLists: ruleForm.whiteLists.split(','),
    requestCheckType: ruleForm.requestCheckType
  }
  requestServiceApi(
    '',
    '',
    'updateProjectInfo',
    data,
    (res: any) => {
      isResult.value = true
    },
    null
  )
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (props.title === '服务申请') {
        applyKey()
      } else {
        updateProjectInfo()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.set-up{
  width: calc(100% - 60px);
  height: calc(100vh - 160px);
  padding: 30px;
  overflow: auto;
}
.el-form{
  .checkbox-box{
    width: 660px;
    display: flex;
    flex-direction: column;
  }
  :deep(.el-divider){
    width: 330px;
    margin-left: 110px;
    .el-divider__text{
      color: #999;
    }
  }
  .el-checkbox-group{
    width: 660px;
    display: flex;
    flex-wrap: wrap;
    .el-checkbox{
      width: 220px;
      margin-right: 0;
    }
  }
  .el-input{
    width: 260px;
  }
  .el-textarea{
    width: 480px;
  }
}
</style>
