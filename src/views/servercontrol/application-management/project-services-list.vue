<template>
  <div class="project-services-list">
    <Treetable
      :datatable="datatable.datatable"
      :data-hearder="childtableObj"
      :align="'left'"
      :is-merge="false"
      @operation-btn="viewStatisticsChart"
      class="table-list"
      height="calc(100vh - 160px)"
    />
    <QuotaStatisticsChart
      :is-quota-statistics-chart="isQuotaStatisticsChart"
      :title="'使用量统计'"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
// import { requestServiceApi } from '@/utils/request-util'
import Treetable from '@/components/utils/tree-table-component.vue'
import QuotaStatisticsChart from '@/components/utils/quota-statistics-chart.vue'

const props = defineProps({
  projectInfo: {
    type: Object,
    default () {
      return {}
    }
  }
})

console.log(props.projectInfo, 'projectInfo')

const childtableObj = reactive([
  { title: '服务名称', id: 'mean', width: '' },
  { title: '调用次数', id: 'rule', width: '' },
  { title: '操作', id: 'operation', width: '120', operation: [{ title: '用量查询', class: 'table-btn' }] }
])
const datatable = reactive({
  datatable: []
})
const isQuotaStatisticsChart = ref(false)

// table表格操作
function viewStatisticsChart (type:string, row: Object) {
  isQuotaStatisticsChart.value = true
  setTimeout(() => {
    isQuotaStatisticsChart.value = false
  })
}
</script>
<style lang="scss" scoped>
.project-services-list{
  padding: 30px;
}
</style>
