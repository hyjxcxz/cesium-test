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
          <template v-if="scope.row.name==='file'">
            <Upload @uploaded="fileUploadSuccess" />
          </template>
          <template v-else>
            <el-input
              v-model="scope.row.value"
              :placeholder="'请输入'+scope.row.name"
              @input="changeParam()"
            />
          </template>
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
import Upload from '@/components/utils/upload-component.vue'

export default {
  props: {
    datatable: { type: Array, default () { return [] } },
    dataHearder: { type: Array, default () { return [] } }
  },
  components: { Upload },
  emits: ['paraminput', 'undate-file'],
  setup (props: any, { emit }: any) {
    function changeParam () {
      emit('paraminput', props.datatable)
    }

    function fileUploadSuccess (file) {
      emit('undate-file', file)
    }
    return {
      changeParam,
      fileUploadSuccess
    }
  }

}

</script>
