<template>
  <div class="content-content">
    <div
      class="guide-content API-content"
    >
      <el-form
        :model="form"
        label-width="120px"
      >
        <el-form-item label="服务名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="服务描述：">
          <el-input
            v-model="descriptionList"
            autosize
            type="textarea"
            placeholder="输入服务描述，每一段完成后请换行"
            @change="descriptionListChange"
          />
        </el-form-item>
        <el-form-item label="适用场景：">
          <el-input
            v-model="scenesList"
            autosize
            type="textarea"
            placeholder="输入适用场景，每一段完成后请换行"
            @change="scenesListChange"
          />
        </el-form-item>
        <el-form-item label="使用说明：">
          <el-input
            v-model="introductionList"
            autosize
            type="textarea"
            placeholder="按步骤输入使用说明，每一步完成后请换行"
            @change="introductionListChange"
          />
        </el-form-item>
        <el-form-item label="服务类型：">
          <el-dropdown
            split-button
            type="primary"
            @command="handleCommand"
          >
            {{ serverTypeCommand }}
            <template #dropdown>
              <el-dropdown-menu>
                <template
                  v-for="(item, index) in serverType"
                  :key="index+'server'"
                >
                  <el-dropdown-item :command="item.id">
                    {{ item.name }}
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="服务URL：">
          <div class="API-URL">
            <ul>
              <li>
                <span>URL</span><span><el-input v-model="form.address" /></span>
              </li>
              <li>
                <span>请求方式</span><span><el-dropdown
                  split-button
                  type="primary"
                  @command="handleCommandURL"
                >
                  {{ form.mode }}
                  <template #dropdown>
                    <el-dropdown-menu>
                      <template
                        v-for="(item, index) in serverMode"
                        :key="index+'server'"
                      >
                        <el-dropdown-item :command="item.name">
                          {{ item.name }}
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown></span>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="请求参数：">
          <TableJson
            :datatable="form.paramList"
            :hearder="tableObj"
            :options="options"
            @operation-btn="operationBtn"
          />
        </el-form-item>
        <el-form-item label="返回参数：">
          <TableJson
            :datatable="form.returnList"
            :hearder="tableReturnObj"
            @operation-btn="operationReturnBtn"
          />
        </el-form-item>
        <el-form-item label="服务示例：">
          <el-input
            v-if="form.mode === 'Post/json'"
            type="textarea"
            v-model="form.exampleJson"
            autosize
            placeholder="输入代码"
          />
          <TableJson
            v-if="form.mode === 'Get'"
            :datatable="form.exampleGetList"
            :hearder="tableExampleListObj"
            :options="options"
            @operation-btn="operationExampleGetBtn"
          />
          <TableJson
            v-if="form.mode === 'Post/form-data'"
            :datatable="form.examplePostList"
            :hearder="tableExampleListObj"
            :options="options"
            @operation-btn="operationExamplePostBtn"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import TableJson from '@/components/utils/table-json-component.vue'

const props = defineProps({
  servicesInfo: {
    type: Object,
    default: () => {}
  },
  title: {
    type: String,
    default: '服务注册'
  }
})

const descriptionList = ref('')
const scenesList = ref('')
const serverTypeCommand = ref('时间限制')
const serverTypeCommandID:any = ref(1)
const serverType = reactive([
  { id: 1, name: '时间限制' },
  { id: 2, name: '访问次数限制' },
  { id: 3, name: '不受时间和次数限制' }
])
const serverMode = reactive([
  { id: 1, name: 'Get' },
  { id: 2, name: 'Post/json' },
  { id: 3, name: 'Post/form-data' }
])
// 请求参数的表头
const tableObj = reactive([
  { title: '参数名', id: 'name', valueType: 'string', width: '220' },
  { title: '类型', id: 'type', valueType: 'select', width: '130' },
  { title: '含义', id: 'mean', valueType: 'string', width: '' },
  { title: '规则说明', id: 'rule', valueType: 'string', width: '' },
  { title: '是否必填', id: 'required', valueType: 'select', width: '120' },
  { title: '缺省值', id: 'defaultValue', valueType: 'string', width: '' },
  { title: '操作', id: 'operation', width: '160', operation: [{ title: '添加子级', class: 'table-btn', type: 'add-children' }, { title: '删除', class: 'table-btn', type: 'del-children' }] }
])
// 请求参数的类型选择数据
const options = reactive([
  {
    title: 'integer',
    value: 'integer',
    isShow: '类型'
  }, {
    title: 'string',
    value: 'string',
    isShow: '类型'
  }, {
    title: 'double',
    value: 'double',
    isShow: '类型'
  }, {
    title: 'double[][]',
    value: 'double[][]',
    isShow: '类型'
  }, {
    title: 'file',
    value: 'file',
    isShow: '类型'
  }, {
    title: '是',
    value: '是',
    isShow: '是否必填'
  }, {
    title: '否',
    value: '否',
    isShow: '是否必填'
  }
])
// 返回参数的表头
const tableReturnObj = reactive([
  { title: '参数名', id: 'name', valueType: 'string', width: '220' },
  { title: '含义', id: 'mean', valueType: 'string', width: '' },
  { title: '规则说明', id: 'rule', valueType: 'string', width: '' },
  { title: '操作', id: 'operation', width: '160', operation: [{ title: '添加子级', class: 'table-btn', type: 'add-children' }, { title: '删除', class: 'table-btn', type: 'del-children' }] }
])
// 服务示例get表头
const tableExampleListObj = reactive([
  { title: '参数名', id: 'name', valueType: 'string', width: '220' },
  { title: '类型', id: 'type', valueType: 'select', width: '130' },
  { title: '值', id: 'mean', valueType: 'string', width: '' },
  { title: '备注', id: 'remarks', valueType: 'string', width: '' },
  { title: '操作', id: 'operation', width: '160', operation: [{ title: '添加子级', class: 'table-btn', type: 'add-children' }, { title: '删除', class: 'table-btn', type: 'del-children' }] }
])
const introductionList = ref('')
const form :any = reactive(
  {
    name: '', // 服务名称
    descriptionList: [], // 服务描述
    scenesList: [], // 适用场景
    introductionList: [], // 使用说明
    address: '', // API URL
    mode: 'Get', // 请求方式
    paramList: [ // 请求参数
      {
        id: 1,
        name: '',
        type: '',
        mean: '',
        rule: '',
        required: '',
        defaultValue: ''
      }
    ],
    returnList: [ // 返回参数
      {
        name: '',
        mean: '',
        rule: ''
      }
    ],
    exampleGetList: [ // 服务示例 get
      {
        name: '',
        type: '',
        mean: '',
        remarks: ''
      }
    ],
    exampleJson: null, // 服务示例Post
    examplePostList: [
      {
        name: '',
        type: '',
        mean: '',
        remarks: ''
      }
    ]
  })

onMounted(() => {
  console.log(props.servicesInfo)
})

function descriptionListChange (value: string) {
  form.descriptionList = value.split('\n')
}
function scenesListChange (value: string) {
  form.scenesList = value.split('\n')
}
function introductionListChange (value: string) {
  form.introductionList = value.split('\n')
}
function handleCommand (e:any) {
  serverType.forEach((item) => {
    if (item.id === e) {
      serverTypeCommand.value = item.name
    }
  })
  serverTypeCommandID.value = e
}
function handleCommandURL (e:string) {
  form.mode = e
}
// 循环处理树结构的增、删
const addTableObj = (type: string, children: any, row: any, obj: any) => {
  if (type === 'add') {
    children.forEach((item: object|any) => {
      if (item.children && item.id === row.id) {
        item.children.push(obj)
      } else if (item.children && item.id !== row.id) {
        addTableObj(type, item.children, row, obj)
      } else if (!item.children && item.id === row.id) {
        item.children = [obj]
      }
    })
  } else if (type === 'del') {
    children.forEach((item: object|any, index: number) => {
      if (item.id === row.id) {
        children.splice(index, 1)
      } else if (item.children && item.id !== row.id) {
        addTableObj(type, item.children, row, obj)
      }
    })
  }
}
// 带时间戳的随机数作为唯一表示
const uniqueId = () => {
  const num = (
    Number(new Date()).toString() + parseInt(10 * Math.random() + '') + parseInt(10 * Math.random() + '') + parseInt(10 * Math.random() + '')
  )
  return num
}
// table表格操作-请求参数
const operationBtn = (type:string, row: object) => {
  const obj = reactive(
    {
      id: uniqueId(),
      name: '',
      type: '',
      mean: '',
      rule: '',
      required: '',
      defaultValue: ''
    }
  )
  if (type === 'add-children') {
    addTableObj('add', form.paramList, row, obj)
  } else if (type === 'add-list') {
    form.paramList.push(obj)
  } else if (type === 'del-children') {
    addTableObj('del', form.paramList, row, obj)
  }
}
// table表格操作-返回参数
const operationReturnBtn = (type:string, row: object) => {
  const obj = reactive(
    {
      id: uniqueId(),
      name: '',
      mean: '',
      rule: ''
    }
  )
  if (type === 'add-children') {
    addTableObj('add', form.returnList, row, obj)
  } else if (type === 'add-list') {
    form.returnList.push(obj)
  } else if (type === 'del-children') {
    addTableObj('del', form.returnList, row, obj)
  }
}
// table表格操作-服务示例get
const operationExampleGetBtn = (type:string, row: object) => {
  const obj = reactive(
    {
      id: uniqueId(),
      name: '',
      type: '',
      mean: '',
      remarks: ''
    }
  )
  if (type === 'add-children') {
    addTableObj('add', form.exampleGetList, row, obj)
  } else if (type === 'add-list') {
    form.exampleGetList.push(obj)
  } else if (type === 'del-children') {
    addTableObj('del', form.exampleGetList, row, obj)
  }
}
// table表格操作-服务示例post
const operationExamplePostBtn = (type:string, row: object) => {
  const obj = reactive(
    {
      id: uniqueId(),
      name: '',
      type: '',
      mean: '',
      remarks: ''
    }
  )
  if (type === 'add-children') {
    addTableObj('add', form.examplePostList, row, obj)
  } else if (type === 'add-list') {
    form.examplePostList.push(obj)
  } else if (type === 'del-children') {
    addTableObj('del', form.examplePostList, row, obj)
  }
}
const onSubmit = () => {
  console.log('tijioa')
}
</script>
<style lang="scss" scoped>
.API-content {
  font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  overflow: auto;
  padding: 30px;
  .API-description {
    margin: 0.8rem 0;
    span {
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  h1 {
    font-size: 1.2em;
    font-weight: bold;
    color: rgb(51, 51, 51);
    white-space: normal;
    font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
    span {
      color: #949695;
      font-size: 12px;
      font-weight: bold;
      display: block;
      margin: 17px 0 0;
    }
  }
  h2 {
    border-bottom: 1px solid #ddddde;
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  h3 {
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  .API-URL {
    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
    }
    li {
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddddde;
      border-left: 1px solid #ddddde;
      border-right: 1px solid #ddddde;
      span {
        display: inline-block;
        height: 37px;
        line-height: 37px;
        padding: 2px 5px;
        color: rgb(51, 51, 51);
        font-size: 14px;
      }
      span:first-child {
        width: 80px;
        border-right: 1px solid #ddddde;
      }
    }
    li:last-child {
      border-bottom: 1px solid #ddddde;
    }
  }
  .API-apiurl {
    background: #f7f7f7;
    width: calc(100% - 20px);
    margin: 10px 0;
    padding: 5px 10px;
    color: rgb(51, 51, 51);;
    span {
      padding: 5px 10px;
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  .API-run {
    margin: 10px auto 20px 10px;
  }
  .API-result {
    min-height: 50px;
    border: 1px solid #ddddde;
    margin: 10px 0;
  }
  .el-form{
    .el-input{
      width: 260px;
    }
    .el-textarea{
      width: 480px;
    }
    .el-button{
      position: absolute;
      left: calc(50% - 95px);
      padding: 0 20px;
    }
  }
}
</style>
