<template>
  <div
    class="guide-content API-content"
  >
    <h1>{{ props.title }}</h1>
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
        <inputTable
          :datatable="form.paramList"
          :hearder="tableObj"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import inputTable from '@/components/utils/input-table-component.vue'

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
const tableObj = reactive([
  { title: '参数名', id: 'name' },
  { title: '类型', id: 'type' },
  { title: '含义', id: 'mean' },
  { title: '规则说明', id: 'rule' },
  { title: '是否必填', id: 'required' },
  { title: '缺省值', id: 'defaultValue' }
  // { title: '操作', id: 'a' }
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
        name: 'code',
        mean: '返回请求状态码',
        rule: '返回值为200表示请求成功，否则表示请求失败'
      }
    ],
    exampleList: [ // 服务示例 get
      {
        name: 'code',
        type: 'integer',
        value: '401',
        note: '100m风速数据编码的编码为401，其它数据编码的获取可参阅数据编码说明',
        required: '是'
      }
    ],
    exampleJson: null // 服务示例Post
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
</script>
<style lang="scss" scoped>
.API-content {
  font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  // width: calc(100% - 221px);
  flex: 1;
  // float: left;
  overflow: auto;
  // margin-left: 10px;
  // margin-right: 10px;
  .API-description {
    margin: 0.8rem 0;
    span {
      // color: #767676;
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
    // font-size: 1.2em;
    // color: #000;
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
        // color: #767676;
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
      // color: #767676;
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
}
</style>
