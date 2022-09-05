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
        :prop="item.prop"
        :label="item.label"
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
