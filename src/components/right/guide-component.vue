<template>
  <div
    v-if="dataobj"
    class="API-content"
  >
    <h1>{{ props.dataobj.name }}</h1>
    <h2>产品说明</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.descriptionList"
      :key="index + 'a'"
    >
      <span>{{ item }}</span>
    </div>
    <h2>适用场景</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.scenesList"
      :key="index + 'b'"
    >
      <span>{{ item }}</span>
    </div>
    <h2>使用说明</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.introductionList"
      :key="index + 'c'"
    >
      <span>{{ item }}</span>
    </div>
    <h3><ul><li>{{ props.dataobj.name }}API URL</li></ul></h3>
    <div class="API-URL">
      <ul>
        <li>
          <span>URL</span><span>{{ props.dataobj.address }}</span>
        </li>
        <li>
          <span>请求方式</span><span>{{ props.dataobj.mode }}</span>
        </li>
      </ul>
    </div>
    <h3><ul><li>请求参数</li></ul></h3>
    <Table
      :datatable="props.dataobj.paramList"
      :data-hearder="tableObj"
    />
    <h3><ul><li>返回结果参数说明</li></ul></h3>
    <Treetable
      :datatable="props.dataobj.returnList"
      :data-hearder="childtableObj"
    />
    <h3><ul><li>服务示例</li></ul></h3>
    <div class>
      {{ apiURL }}
    </div>
    <template v-if="props.dataobj.mode.indexOf('Post')!==-1">
      <!-- <el-input
        v-model="exampleStrings"
        type="textarea"
        placeholder="请输入参数"
      /> -->
      <Input
        v-if="exampleStrings"
        :example-string="exampleStrings"
        @param="changeParam"
      />
    </template>
    <template v-else>
      <Editetable
        :datatable="props.dataobj.exampleList"
        :data-hearder="exmpletableObj"
      />
    </template>
    <el-button
      type="primary"
      :loading="loading"
      @click="clickRun()"
    >
      运行
    </el-button>
    <json-viewer
      v-if="Object.keys(resultData.data).length!==0"
      :value="resultData.data"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onUpdated } from 'vue'
import Table from '@/components/utils/table-component.vue'
import Treetable from '@/components/utils/tree-table-component.vue'
import Editetable from '@/components/utils/edite-table-component.vue'
import { requestApi } from '@/utils/request-util'
import Input from '@/components/utils/input-component.vue'
const tableObj = reactive([
  { label: '参数名', prop: 'name' },
  { label: '类型', prop: 'type' },
  { label: '含义', prop: 'mean' },
  { label: '规则说明', prop: 'rule' },
  { label: '是否必填', prop: 'required' },
  { label: '缺省值', prop: 'defaultValue' }
])
const exmpletableObj = reactive([
  { label: '参数名', prop: 'name' },
  { label: '类型', prop: 'type' },
  { label: '值', prop: 'value' },
  { label: '备注', prop: 'note' }
])
const childtableObj = reactive([
  { label: '名称', prop: 'name' },
  { label: '含义', prop: 'mean' },
  { label: '规则说明', prop: 'rule' }
])
const apiURL = ref('')
const loading = ref(false)
let apiMAne:any = reactive([])
const apiName:string = ref('')
const resultData:any = reactive({ data: {} })
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  }
})
const exampleStrings:string = ref('')
const exampleParam:string = ref('')
onUpdated(() => {
  exampleStrings.value = JSON.parse(JSON.stringify(props.dataobj.exampleJson))
  exampleParam.value = exampleStrings.value
})
getURL()
function getURL () {
  apiURL.value = props.dataobj.address
  if (props.dataobj.exampleList && props.dataobj.exampleList.length > 0) {
    props.dataobj.exampleList.forEach((item, index) => {
      if (index === 0) {
        apiURL.value += '?'
      }
      apiURL.value += item.name + '=' + item.value + '&'
    })
    apiURL.value += 'key=<用户的key>'
  }
}
function changeParam (e) {
  exampleParam.value = e
}
function clickRun () {
  apiMAne = props.dataobj.address.split('/')
  apiName.value = apiMAne[apiMAne.length - 1]
  loading.value = true
  if (props.dataobj.mode.indexOf('Post') !== -1) {
    postQuery()
  } else {
    getQuery()
  }
}
function getQuery () {
  requestApi(
    apiName.value,
    null,
    (res:any) => {
      loading.value = false
      if (res.message === 'OK' && res.data) {
        resultData.data = res
        loading.value = false
      }
    }, null)
}
function postQuery () {
  requestApi(
    apiName.value,
    JSON.parse(exampleParam.value),
    (res:any) => {
      if (res.message === 'OK' && res.data) {
        resultData.data = res
        loading.value = false
      }
    }, null)
}
</script>
<style lang="scss" scoped>
.API-content {
  width: calc(100% - 211px);
  float: left;
  height: 100% ;
  overflow: auto;
  margin-left:10px;
  h1{
    font-size: 1.4em;
  }
  h2{
    border-bottom: 1px solid #ddddde;
    font-size: 1.2em;
    color: #000;
  }
  h3{
    font-size: 1em;
  }
  .API-URL{
    ul{
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      margin-right:10px;
    }
    li{
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddddde;
      border-left: 1px solid #ddddde;
      border-right: 1px solid #ddddde;
      span{
        display:inline-block;
        height:37px;
        line-height:37px;
        padding:2px 5px;
      }
      span:first-child{
        width:80px;
        border-right: 1px solid #ddddde;
      }
    }
    li:last-child{
       border-bottom: 1px solid #ddddde;
    }
  }
}
</style>
