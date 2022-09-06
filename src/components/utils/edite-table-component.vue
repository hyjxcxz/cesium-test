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
        v-if="item.label==='备注'"
        :prop="item.prop"
        :label="item.label"
      />
      <el-table-column
        v-else-if="item.label==='值'"
        :prop="item.prop"
        :label="item.label"
      >
        <template #default="scope">
          <el-input
            v-model="scope.row.value"
            :placeholder="'请输入'+scope.row.name"
            @input="changeParam(scope)"
          />
        </template>
      </el-table-column>
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
const emits = defineEmits(['paraminput'])
function changeParam (scope) {
  emits('paraminput', props.datatable)
}
</script>
