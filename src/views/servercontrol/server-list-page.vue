<template>
  <div class="content-content">
    <div
      v-if="!isSetUp"
      class="server-list-page"
    >
      <SearchInput
        :placeholder="placeholder"
        :width="'240px'"
        :size="'default'"
        @search-value="searchValue"
      />
      <el-button
        class="add-server"
        type="primary"
        @click="addServer()"
      >
        <el-icon
          class="add-icon"
        >
          <Plus />
        </el-icon> 添加服务
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
      v-if="isSetUp"
      class="services-set-up"
    >
      <span
        @click="goBack"
        class="go-back"
      >
        <el-icon style="vertical-align: middle">
          <ArrowLeftBold />
        </el-icon>返回
      </span>
      <span class="header-title">{{ headerTitle }}</span>
      <Register
        :services-info="servicesInfo.info"
        :title="headerTitle"
        @go-back="goBack"
      />
    </div>
    <QuotaStatisticsChart
      :is-quota-statistics-chart="isQuotaStatisticsChart"
      :title="'使用量统计'"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ArrowLeftBold, Plus } from '@element-plus/icons-vue'
import { requestServiceApi } from '@/utils/request-util'
import { ElMessage, ElMessageBox } from 'element-plus'
import Treetable from '@/components/utils/tree-table-component.vue'
import SearchInput from '../../composables/search/search-input.vue'
import QuotaStatisticsChart from '@/components/utils/quota-statistics-chart.vue'
import Register from '@/components/right/register-component.vue'

const headerTitle = ref('服务注册')
const childtableObj = reactive([
  { title: '服务名称', id: 'name', width: '300' },
  { title: '接口路径', id: 'uri', width: '' },
  { title: '注册人', id: 'registrar', width: '100' },
  { title: '创建时间', id: 'creatTime', width: '160' },
  { title: '调用次数', id: 'visitNums', width: '100' },
  { title: '操作', id: 'operation', width: '200', operation: [{ title: '用量查询', class: 'table-btn', type: 'quota' }, { title: '编辑', class: 'table-btn', type: 'put' }, { title: '删除', class: 'table-btn', type: 'del' }] }
])
const datatable = reactive({
  datatable: [
    {
      creatTime: '2022-10-09 18:53:29',
      id: '59abc450b53944c1a385d779a8a7a848',
      name: '风电场选址',
      registrar: null,
      uri: '/analysis/windFarmLocation',
      visitNums: 0
    }
  ]
})
const placeholder = ref('请输入关键字搜索')
const searchInfo = reactive({
  current: 1,
  size: 10,
  fuzzyQuery: ''
})
const total = ref(0)
const isSetUp = ref(false)
interface ServicesInfo {
  info: object
}
const servicesInfo:ServicesInfo = reactive({
  info: {}
})
const isQuotaStatisticsChart = ref(false)

const getServerList = () => {
  requestServiceApi(
    '',
    '',
    'getServerList',
    searchInfo,
    (res: any) => {
      datatable.datatable = res.data
      total.value = res.total
    },
    null
  )
}
onMounted(() => {
  getServerList()
})

// table表格操作
const viewQuota = (type:string, row: object) => {
  if (type === 'quota') {
    isQuotaStatisticsChart.value = true
    setTimeout(() => {
      isQuotaStatisticsChart.value = false
    })
  } else if (type === 'put') {
    isSetUp.value = true
    headerTitle.value = '修改服务'
  } else if (type === 'del') {
    open(row)
  }
  servicesInfo.info = row
}
const open = (row:any) => {
  ElMessageBox.confirm(
    '确定要删除这个服务吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      requestServiceApi(
        '',
        '',
        'deleteServerInfo',
        null,
        (res: any) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getServerList()
          } else {
            ElMessage({
              type: 'error',
              message: res.message
            })
          }
        },
        [row.id]
      )
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除成功'
      })
    })
}
// 搜索
const searchValue = (value: string) => {
  searchInfo.fuzzyQuery = value
  searchInfo.current = 1
  getServerList()
}
// 分页
const changeCurrent = (current: number) => {
  searchInfo.current = current
  getServerList()
}
// 添加服务
const addServer = () => {
  isSetUp.value = true
  headerTitle.value = '服务注册'
  servicesInfo.info = {}
}
const goBack = () => {
  isSetUp.value = false
  getServerList()
  servicesInfo.info = {}
}
</script>
<style lang="scss" scoped>
.server-list-page{
  padding: 30px;
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
  flex:1;
  padding: 8px;
  overflow: hidden;
  .table-list{
    margin-top: 8px;
  }
}
.services-set-up{
  flex:1;
  overflow: hidden;
}
</style>
