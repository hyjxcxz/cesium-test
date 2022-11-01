<template>
  <div class="content-content">
    <div
      v-if="!isViewQuota && !isSetUp"
      class="application-management-list"
    >
      <SearchInput
        :placeholder="placeholder"
        :width="'240px'"
        :size="'default'"
        @search-value="searchValue"
      />
      <el-button
        class="add-user"
        type="primary"
        @click="addUser()"
      >
        <el-icon
          class="add-icon"
        >
          <Plus />
        </el-icon> 添加用户
      </el-button>
      <el-button
        class="add-server"
        type="primary"
        @click="addServer()"
      >
        <el-icon
          class="add-icon"
        >
          <Plus />
        </el-icon> 添加应用
      </el-button>
      <Treetable
        :datatable="datatable.datatable"
        :data-hearder="childtableObj"
        :align="'left'"
        @operation-btn="viewQuota"
        class="table-list"
      />
      <el-pagination
        v-model:currentPage="searchInfo.current"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="searchInfo.size"
        @current-change="changeCurrent"
      />
    </div>
    <div
      v-if="isViewQuota"
      class="project-services-list"
    >
      <span
        @click="goBack"
        class="go-back"
      >
        <el-icon style="vertical-align: middle">
          <ArrowLeftBold />
        </el-icon>
        返回
      </span>
      <span class="header-title">
        {{ projectServicesInfo.info.subject }}
      </span>
      <ProjectServicesList :project-info="projectServicesInfo.info" />
    </div>
    <div
      v-if="isSetUp"
      class="services-set-up"
    >
      <span
        @click="goBack"
        class="go-back"
      >
        <el-icon style="vertical-align: middle">
          <ArrowLeftBold />
        </el-icon>
        返回
      </span>
      <span class="header-title"> {{ headerTitle }} </span>
      <ServicesConfig
        :title="headerTitle"
        :project-info="projectServicesInfo.info"
        @go-back="goBack"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ArrowLeftBold, Plus } from '@element-plus/icons-vue'
import { requestServiceApi } from '@/utils/request-util'
import { useRouter } from 'vue-router'
import Treetable from '@/components/utils/tree-table-component.vue'
import SearchInput from '../../../composables/search/search-input.vue'
import ProjectServicesList from './project-services-list.vue'
import ServicesConfig from './services-config.vue'

const router = useRouter()
const childtableObj = reactive([
  { title: '项目名称', id: 'subject', width: '300' },
  { title: '授权key', id: 'apiKey', width: '' },
  { title: '截止时间', id: 'validTime', width: '160' },
  { title: '操作', id: 'operation', width: '160', operation: [{ title: '额度', class: 'table-btn', type: 'quota' }, { title: '设置', class: 'table-btn', type: 'setUp' }] }
])
const headerTitle = ref('服务申请')
const datatable = reactive({
  datatable: []
})
const placeholder = ref('请输入关键字搜索')
const isViewQuota = ref(false)
const isSetUp = ref(false)
const projectServicesInfo:any = reactive({
  info: {}
})
const searchInfo = reactive({
  current: 1,
  size: 10,
  fuzzyQuery: ''
})
const total = ref(0)

const getProjectInfoList = () => {
  requestServiceApi(
    '',
    '',
    'getProjectInfoList',
    searchInfo,
    (res: any) => {
      datatable.datatable = res.data
      total.value = res.total
    },
    null
  )
}
onMounted(() => {
  getProjectInfoList()
})

// table表格操作
const viewQuota = (type:string, row: Object) => {
  if (type === 'quota') {
    isViewQuota.value = true
  } else if (type === 'setUp') {
    isSetUp.value = true
    headerTitle.value = '修改应用'
  }
  projectServicesInfo.info = row
}
// 搜索
const searchValue = (value: string) => {
  searchInfo.fuzzyQuery = value
  searchInfo.current = 1
  getProjectInfoList()
}
// 分页
const changeCurrent = (current: number) => {
  searchInfo.current = current
  getProjectInfoList()
}
const goBack = () => {
  isViewQuota.value = false
  isSetUp.value = false
  getProjectInfoList()
  projectServicesInfo.info = {}
}
// 添加应用
const addServer = () => {
  isSetUp.value = true
  headerTitle.value = '服务申请'
  projectServicesInfo.info = {}
}
// 添加用户
const addUser = () => {
  router.push('/register')
}
</script>
<style lang="scss" scoped>
.application-management-list{
  padding: 30px;
  .add-user{
    position: absolute;
    right: 140px;
    .add-icon{
      font-weight: 500;
      margin-right: 2px;
    }
  }
  .add-server{
    position: absolute;
    right: 30px;
    .add-icon{
      font-weight: 500;
      margin-right: 2px;
    }
  }
  .table-list{
    margin-top: 10px;
  }
  .el-pagination{
    margin-top: 10px;
    float: right;
  }
}
.project-services-list{
  .table-list{
    margin-top: 8px;
  }
}
.services-set-up{
  flex:1;
  overflow: hidden;
}
</style>
