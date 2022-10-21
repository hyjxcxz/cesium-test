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
        label="项目名称"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        label="服务key"
        v-if="props.title === '修改应用'"
      >
        <el-input
          v-model="ruleForm.key"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="启用服务"
        prop="type"
      >
        <div class="checkbox-box">
          <el-divider>
            基础服务
          </el-divider>
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox
              v-for="item in serviceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              name="type"
            />
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item
        label="有效日期"
        prop="date1"
      >
        <el-date-picker
          v-model="ruleForm.date1"
          type="date"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="请求校验方式"
        prop="region"
      >
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择"
        >
          <el-option
            label="IP白名单校验"
            value="IP白名单校验"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="IP白名单"
        prop="desc"
      >
        <el-input
          v-model="ruleForm.desc"
          autosize
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">
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
      :title="'提交成功'"
      :sub-title="'我们会尽快处理此问题，请耐心等待…'"
      @go-back="goback"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Result from '@/components/utils/result-component.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
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
  name: '',
  key: '',
  region: 'IP白名单校验',
  date1: '',
  type: [],
  desc: ''
})
const serviceList = reactive([
  {
    label: '点查询',
    value: '点查询'
  }, {
    label: '行政区划查询',
    value: '行政区划查询'
  }, {
    label: '矢量文件格式转换',
    value: '矢量文件格式转换'
  }, {
    label: '面查询',
    value: '面查询'
  }
])
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
  name: [
    { required: true, validator: validateName, trigger: 'blur' }
  ],
  region: [
    {
      required: true,
      message: '请选择校验方式',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请选择要启用的服务',
      trigger: 'change'
    }
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择有效日期',
      trigger: 'change'
    }
  ],
  desc: [
    { required: true, validator: validateIP, trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      isResult.value = true
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
  ::v-deep .el-divider{
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
