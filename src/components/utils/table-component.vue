<template>
  <el-table
    :data="props.datatable"
    style="width: 100%;"
    border
  >
    <template
      v-for="(item, index) in props.dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.title==='含义'||item.title==='规则说明'"
        :prop="item.id"
        :label="item.title"
      />
      <el-table-column
        v-else-if="item.title==='code'||item.title==='参数名'||item.title==='类型'||item.title==='是否必填'||item.title==='缺省值'"
        :prop="item.id"
        :label="item.title"
        width="100px"
      />
      <el-table-column
        v-else
        :prop="item.id"
        :label="item.title"
      />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
const props = defineProps({
  datatable: { type: Array, default () { return [] } },
  dataHearder: { type: Array, default () { return [] } }
})
</script>
