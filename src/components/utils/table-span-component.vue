<template>
  <el-table
    v-if="datatable.length>0"
    :data="datatable"
    style="width: 100%;"
    row-key="name"
    :span-method="objectSpanMethod"
    border
    default-expand-all
  >
    <template
      v-for="(item, index) in dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.title==='含义'||item.title==='规则说明'"
        :prop="item.id"
        :label="item.title"
      />
      <el-table-column
        v-else-if="item.title==='code'||item.title==='类型'||item.title==='数据类型'||item.title==='图层名称'||item.title==='是否必填'||item.title==='缺省值'"
        :prop="item.id"
        :label="item.title"
        width="120px"
      />
      <el-table-column
        v-else-if="item.title==='参数名'"
        :prop="item.id"
        :label="item.title"
        width="210px"
      />
      <el-table-column
        v-else-if="item.title==='数据名称'"
        :prop="item.id"
        :label="item.title"
        width="250px"
      />
      <el-table-column
        v-else-if="item.title==='服务地址'"
        :prop="item.id"
        :label="item.title"
      >
        <template #default="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :prop="item.id"
        :label="item.title"
      />
    </template>
  </el-table>
</template>
<script lang="ts" >
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { reactive, ref, watchEffect } from 'vue'

interface User {
  name: string
  layerName: string
  type: string
  url: number
}
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}
export default {
  props: {
    datatable: { type: Array, default: () => [] },
    dataHearder: { type: Array, default: () => [] }
  },
  setup (props: any, { emit }: any) {
    let spanArr:any = reactive([])
    const pos = ref(1)
    watchEffect(() => {
      if (props.datatable) {
        getSpanArr()
      }
    })
    const objectSpanMethod = ({
      row,
      column,
      rowIndex,
      columnIndex
    }: SpanMethodProps) => {
      if (columnIndex === 0) {
        return {
          rowspan: spanArr[rowIndex],
          colspan: spanArr[rowIndex] > 0 ? 1 : 0
        }
      }
    }
    function getSpanArr () {
      spanArr = []
      for (let i = 0; i < props.datatable.length; i++) {
        if (i === 0) {
          spanArr.push(1)
          pos.value = 0
        } else {
          if (props.datatable[i].type === props.datatable[i - 1].type) {
            spanArr[pos.value] += 1
            spanArr.push(0)
          } else {
            spanArr.push(1)
            pos.value = i
          }
        }
      }
    }
    return {
      objectSpanMethod,
      getSpanArr
    }
  }
}
</script>
