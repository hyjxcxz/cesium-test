<template>
  <el-table
    :data="props.datatable"
    style="width: 100%; margin-right: 10px;"
    border
  >
    <template
      v-for="(item, index) in props.dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.label==='含义'||item.label==='规则说明'"
        :prop="item.prop"
        :label="item.label"
      />
      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        width="100px"
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
