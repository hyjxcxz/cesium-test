<template>
  <el-table
    :data="props.datatable"
    :span-method="props.isMerge ? arraySpanMethod : () => {}"
    style="width: 100%;"
    row-key="name"
    border
    default-expand-all
  >
    <template
      v-for="(item, index) in props.dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.id !== 'operation'"
        :prop="item.id"
        :label="item.title"
        :align="props.align"
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
            @click="emits('operationBtn', v.type, scope.row)"
          >{{ v.title }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts" setup>
const props = defineProps({
  datatable: {
    type: Array,
    default () {
      return []
    }
  },
  dataHearder: {
    type: Array,
    default () {
      return []
    }
  },
  align: {
    type: String,
    default: 'left'
  },
  isMerge: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['operationBtn'])

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
</script>
<style>
</style>
