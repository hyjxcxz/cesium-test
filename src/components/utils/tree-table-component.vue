<template>
  <el-table
    :data="props.datatable"
    style="width: 100%; margin-bottom: 20px"
    row-key="name"
    border
    default-expand-all
  >
    <template
      v-for="(item, index) in props.dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.label==='名称'"
        :prop="item.prop"
        :label="item.label"
        width="200px"
      />
      <el-table-column
        v-else
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
<style>
.el-table__expand-icon{
/* display:none !important; */
}
</style>
