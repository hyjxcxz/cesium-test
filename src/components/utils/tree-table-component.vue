<template>
  <el-table
    :data="datatable"
    :span-method="isMerge ? arraySpanMethod : () => {}"
    style="width: 100%;"
    row-key="name"
    border
    default-expand-all
  >
    <template
      v-for="(item, index) in dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.id !== 'operation'"
        :prop="item.id"
        :label="item.title"
        :align="align"
        :width="item.width"
      />
      <el-table-column
        v-else
        :label="item.title"
        :align="align"
        :width="item.width"
      >
        <template #default="scope">
          <span
            v-for="v in item.operation"
            :key="v.title"
            :class="v.class"
            @click="clickOperationBtn(v.type, scope.row)"
          >{{ v.title }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
export default {
  props: {
    datatable: {
      type: Array,
      default: () => []
    },
    dataHearder: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: () => ''
    },
    isMerge: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['operationBtn'],
  setup (props:any, { emit }:any) {
    interface SpanMethodProps {
      row: object
      column: any
      rowIndex: number
      columnIndex: number
    }

    // 合并第一列
    const arraySpanMethod = ({
      row,
      column,
      rowIndex,
      columnIndex
    }: SpanMethodProps) => {
      if (columnIndex === 0) {
        if (columnIndex === 0 && rowIndex === 0) {
          return {
            rowspan: props.datatable.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
    const clickOperationBtn = (type: string, row: object) => {
      emit('operationBtn', type, row)
    }
    return {
      arraySpanMethod,
      clickOperationBtn
    }
  }
}
</script>
<style>
</style>
