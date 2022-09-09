<template>
  <div
    v-if="dataobj"
    class="guide-content API-content"
  >
    <h1>
      {{ props.dataobj.name }}
      <span>更新时间：2022年09月07日</span>
    </h1>
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
    <h3>
      <ul>
        <li>{{ props.dataobj.name }}API URL</li>
      </ul>
    </h3>
    <div class="API-URL">
      <ul>
        <li>
          <span>URL</span><span>{{ props.dataobj.address }}</span>
        </li>
        <li>
          <span>请求方式</span><span>{{ props.dataobj.mode }}</span>
        </li>
        <li>
          <span>请求头</span><span>{{ hearders }}</span>
        </li>
      </ul>
    </div>
    <h3>
      <ul>
        <li>请求参数</li>
      </ul>
    </h3>
    <Table
      :datatable="props.dataobj.paramList"
      :data-hearder="tableObj"
    />
    <h3>
      <ul>
        <li>返回结果参数说明</li>
      </ul>
    </h3>
    <Treetable
      :datatable="props.dataobj.returnList"
      :data-hearder="childtableObj"
    />
    <h3>
      <ul>
        <li>服务示例</li>
      </ul>
    </h3>
    <div class="API-apiurl">
      <span>{{ apiURL }}</span>
      <br>
      <span>{{ hearders }}</span>
    </div>
    <template
      v-if="props.dataobj.mode && props.dataobj.mode.indexOf('Post') !== -1"
    >
      <Input
        v-if="exampleStrings"
        :example-string="exampleStrings"
        @param="changeParam"
      />
    </template>
    <template v-else-if="props.dataobj.mode && props.dataobj.mode.indexOf('Get') !== -1">
      <Editetable
        v-if="props.dataobj.exampleList.length>0"
        :datatable="props.dataobj.exampleList"
        :data-hearder="exmpletableObj"
        @paraminput="paraminput"
      />
    </template>
    <el-button
      class="API-run"
      type="primary"
      :loading="loading"
      @click="clickRun()"
    >
      运行
    </el-button>
    <div class="API-result">
      <json-viewer
        v-if="Object.keys(resultData.data).length !== 0"
        :value="resultData.data"
      />
    </div>
  </div>
  <div v-else>
    <nodataComponentVue :data="nodata" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'
import Table from '@/components/utils/table-component.vue'
import Treetable from '@/components/utils/tree-table-component.vue'
import Editetable from '@/components/utils/edite-table-component.vue'
import { requestApi } from '@/utils/request-util'
import Input from '@/components/utils/input-component.vue'
import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const nodata = ref('暂无数据')
const tableObj = reactive([
  { title: '参数名', id: 'name' },
  { title: '类型', id: 'type' },
  { title: '含义', id: 'mean' },
  { title: '规则说明', id: 'rule' },
  { title: '是否必填', id: 'required' },
  { title: '缺省值', id: 'defaultValue' }
])
const exmpletableObj = reactive([
  { title: '参数名', id: 'name' },
  { title: '类型', id: 'type' },
  { title: '值', id: 'value' },
  { title: '备注', id: 'note' }
])
const childtableObj = reactive([
  { title: '名称', id: 'name' },
  { title: '含义', id: 'mean' },
  { title: '规则说明', id: 'rule' }
])
const apiURL = ref('')
const hearders = ref('headers.apiKey=<用户的key>')
const loading = ref(false)
let apiMAne: any = reactive([])
const apiName = ref('')
const resultData: any = reactive({
  data: { discription: '此处显示运行结果信息' }
})
// onRenderTracked(() => {
//   resultData = reactive({
//     data: { discription: '此处显示运行结果信息' }
//   })
// })
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  }
})
const exampleStrings = ref('')
const exampleParam = ref('')
let exampleParamget = reactive([] as any)
watchEffect(() => {
  if (props.dataobj) {
    exampleStrings.value = props.dataobj.exampleJson
    exampleParam.value = exampleStrings.value
    resultData.data = { discription: '此处显示运行结果信息' }
    getURL()
  }
})
getURL()
function getURL () {
  exampleParamget = []
  apiURL.value = props.dataobj.address
  if (props.dataobj.exampleList && props.dataobj.exampleList.length > 0) {
    props.dataobj.exampleList.forEach((item:any, index:number) => {
      exampleParamget.push(item.value)
      if (index === 0) {
        apiURL.value += '?' + item.name + '=' + item.value
      } else {
        apiURL.value += '&' + item.name + '=' + item.value
      }
    })
  }
}
function changeParam (e:string) {
  exampleParam.value = e
}
function paraminput (e:any) {
  exampleParamget = []
  e.forEach((item:any) => {
    exampleParamget.push(item.value)
  })
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
  getURL()
  requestApi(
    apiURL.value,
    apiName.value,
    null,
    (res: any) => {
      loading.value = false
      resultData.data = res
    },
    null
  )
}
function postQuery () {
  requestApi(
    apiURL.value,
    apiName.value,
    JSON.parse(exampleParam.value),
    (res: any) => {
      resultData.data = res
      loading.value = false
    },
    null
  )
}
</script>
<style lang="scss" scoped>
.API-content {
  width: calc(100% - 221px);
  float: left;
  overflow: auto;
  margin-left: 10px;
  margin-right: 10px;
  .API-description {
    span {
      color: #767676;
      font-size: 14px;
    }
  }
  h1 {
    font-size: 1.4em;
    color: #292929;
    font-weight: 400;
    span {
      color: #afb1b0;
      font-size: 12px;
      font-weight: 400;
      display: block;
      margin: 17px 0 0;
    }
  }
  h2 {
    border-bottom: 1px solid #ddddde;
    // font-size: 1.2em;
    // color: #000;
    font-size: 18px;
    font-weight: 400;
    color: #3c3d3f;
  }
  h3 {
    font-size: 1em;
    font-weight: 400;
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
        color: #767676;
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
    color: #767676;
    span{
      padding: 5px 10px;
      color: #767676;
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
