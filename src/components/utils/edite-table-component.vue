<template>
  <el-table
    :data="datatable"
    style="width: 100%;"
    border
  >
    <template
      v-for="(item, index) in dataHearder"
      :key="index+'d'"
    >
      <el-table-column
        v-if="item.title==='备注'"
        :prop="item.id"
        :label="item.title"
      />
      <el-table-column
        v-else-if="item.title==='值'"
        :prop="item.id"
        :label="item.title"
      >
        <template #default="scope">
          <el-input
            v-model="scope.row.value"
            :placeholder="'请输入'+scope.row.name"
            @input="changeParam()"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :prop="item.id"
        :label="item.title"
        width="100px"
      />
    </template>
  </el-table>
</template>
<script lang="ts" >
export default {
  props: {
    datatable: { type: Array, default () { return [] } },
    dataHearder: { type: Array, default () { return [] } }
  },
  emits: ['paraminput'],
  setup (props: any, { emit }: any) {
    function changeParam () {
      emit('paraminput', props.datatable)
    }
    return {
      changeParam
    }
  }

}

</script>
