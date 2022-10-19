<template>
  <div :class="props.title === '修改应用' ? 'put-up' : 'set-up'">
    <span
      class="services-header-title"
      v-if="props.title !== '修改应用'"
    >{{ props.title }}</span>
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
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

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(ruleForm)
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
.put-up{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.set-up{
  flex:1;
  padding: 8px 0;
  overflow: auto;
  .services-header-title{
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    margin: 8px 16px 0 16px;
  }
}
.el-form{
  padding: 30px;
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
