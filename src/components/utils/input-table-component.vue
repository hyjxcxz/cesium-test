<template>
  <el-table
    :data="datatable"
    style="width: 100%;"
    border
    default-expand-all
  >
    <template
      v-for="(item, index) in hearder"
      :key="index+'ds'"
    >
      <el-table-column
        v-if="item.title==='参数名'"
        :prop="item.id"
        :label="item.title"
        width="200px"
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
    </template>
    <!-- <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <a @click="append(data)"> Append </a>
          <a
            style="margin-left: 8px"
            @click="remove(node, data)"
          > Delete </a>
        </span>
      </span>
    </template> -->
  </el-table>
</template>
<script lang="ts" >
import Upload from '@/components/utils/upload-component.vue'

export default {
  props: {
    datatable: { type: Array, default () { return [] } },
    hearder: { type: Array, default () { return [] } }
  },
  components: { Upload },
  emits: ['paraminput', 'undate-file'],
  setup (props: any, { emit }: any) {
    function changeParam () {
      emit('paraminput', props.datatable)
    }

    function fileUploadSuccess (file:Object) {
      emit('undate-file', file)
    }
    function append (data: Object) {
    //   const newChild = { id: id++, label: 'testtest', children: [] }
    //   if (!data.children) {
    //     data.children = []
    //   }
    //   data.children.push(newChild)
    //   dataSource.value = [...dataSource.value]
    }

    function remove (node: Node, data: any) {
      // eslint-disable-next-line no-debugger
      debugger
    }
    return {
      changeParam,
      fileUploadSuccess,
      append,
      remove
    }
  }

}
</script>
