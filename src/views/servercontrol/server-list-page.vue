<template>
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
      :datatable="datatable"
      :data-hearder="childtableObj"
      :align="'left'"
      @operation-btn="viewQuota"
      class="table-list"
    />
    <el-pagination
      v-model:currentPage="current"
      background
      layout="prev, pager, next"
      :hide-on-single-page="datatable.length < size"
      :total="datatable.length"
      :page-size="size"
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
      </el-icon>
      返回
    </span>
    <Register
      :services-info="servicesInfo"
      :title="headerTitle"
    />
  </div>
  <QuotaStatisticsChart
    :is-quota-statistics-chart="isQuotaStatisticsChart"
    :title="'使用量统计'"
  />
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowLeftBold, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Treetable from '@/components/utils/tree-table-component.vue'
import SearchInput from '../../composables/search/search-input.vue'
import QuotaStatisticsChart from '@/components/utils/quota-statistics-chart.vue'
import Register from '@/components/right/register-component.vue'

const headerTitle = ref('服务注册')
const childtableObj = reactive([
  { title: '服务名称', id: 'a', width: '300' },
  { title: '接口路径', id: 'b', width: '' },
  { title: '注册人', id: 'c', width: '' },
  { title: '创建时间', id: 'd', width: '' },
  { title: '调用次数', id: 'e', width: '' },
  { title: '操作', id: 'operation', width: '180', operation: [{ title: '用量查询', class: 'table-btn', type: 'quota' }, { title: '编辑', class: 'table-btn', type: 'put' }, { title: '删除', class: 'table-btn', type: 'del' }] }
])
const datatable = reactive([
  {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }, {
    a: 1,
    b: '1',
    c: '1',
    d: '1',
    e: '1',
    f: '1'
  }
])
const placeholder = ref('请输入关键字搜索')
const size = ref(10)
const current = ref(1)
const isSetUp = ref(false)
let servicesInfo = reactive({})
const isQuotaStatisticsChart = ref(false)

// table表格操作
const viewQuota = (type:string, row: Object) => {
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
  servicesInfo = row
}
const open = (row:Object) => {
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
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除成功'
      })
    })
}
// 搜索
const searchValue = (value: String) => {
  console.log(value)
}
// 分页
const changeCurrent = (current: Number) => {
  // console.log(current)
}
// 添加服务
const addServer = () => {
  isSetUp.value = true
  headerTitle.value = '服务注册'
  servicesInfo = {}
}
const goBack = () => {
  isSetUp.value = false
  servicesInfo = {}
}
</script>
<style lang="scss" scoped>
.server-list-page{
  flex:1;
  padding: 8px;
  .add-server{
    position: absolute;
    right: 10px;
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
.go-back{
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  .el-icon{
    margin-top: -4px;
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
  padding: 8px;
  overflow: hidden;
}
</style>
