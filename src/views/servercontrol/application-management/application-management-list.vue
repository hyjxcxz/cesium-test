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
      <ProjectServicesList :project-info="projectServicesInfo" />
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
      <span class="header-title"> 修改应用 </span>
      <ServicesConfig :title="'修改应用'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import Treetable from '@/components/utils/tree-table-component.vue'
import SearchInput from '../../../composables/search/search-input.vue'
import ProjectServicesList from './project-services-list.vue'
import ServicesConfig from './services-config.vue'

const childtableObj = reactive([
  { title: '项目名称', id: 'name', width: '300' },
  { title: '授权key', id: 'mean', width: '' },
  { title: '剩余额度', id: 'rule', width: '' },
  { title: '操作', id: 'operation', width: '160', operation: [{ title: '额度', class: 'table-btn', type: 'quota' }, { title: '设置', class: 'table-btn', type: 'setUp' }] }
])
const datatable = reactive([
  {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }, {
    name: 1,
    mean: '1',
    rule: '1'
  }
])
const placeholder = ref('请输入关键字搜索')
const size = ref(10)
const current = ref(1)
const isViewQuota = ref(false)
const isSetUp = ref(false)
let projectServicesInfo = reactive({})

// table表格操作
const viewQuota = (type:string, row: Object) => {
  if (type === 'quota') {
    isViewQuota.value = true
  } else if (type === 'setUp') {
    isSetUp.value = true
  }
  projectServicesInfo = row
}
// 搜索
const searchValue = (value: String) => {
  console.log(value)
}
// 分页
const changeCurrent = (current: Number) => {
  // console.log(current)
}
const goBack = () => {
  isViewQuota.value = false
  isSetUp.value = false
  projectServicesInfo = {}
}
</script>
<style lang="scss" scoped>
.application-management-list{
  padding: 30px;
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
