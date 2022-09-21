<template>
  <el-table
    :data="datatable"
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
        v-if="item.title==='含义'||item.title==='规则说明'"
        :prop="item.id"
        :label="item.title"
      />
      <el-table-column
        v-else-if="item.title==='code'||item.title==='类型'||item.title==='是否必填'||item.title==='缺省值'"
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
        v-else
        :prop="item.id"
        :label="item.title"
      />
    </template>
  </el-table>
</template>
<script lang="ts" >
export default {
  props: {
    datatable: { type: Array, default: () => [] },
    dataHearder: { type: Array, default: () => [] }
  }
}
</script>
