<template>
  <el-table
    :data="datatable"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <template
      v-for="item in hearder"
      :key="item.id"
    >
      <el-table-column
        v-if="item.id !== 'operation'"
        :prop="item.id"
        :label="item.title"
        :width="item.width"
      >
        <template
          #header
          v-if="item.title === '参数名'"
        >
          <span>参数名</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="添加新行"
            placement="top"
          >
            <span
              class="add-list"
              @click="clickOperationBtn('add-list', {})"
            >
              <el-icon>
                <Plus />
              </el-icon>
            </span>
          </el-tooltip>
        </template>
        <template #default="scope">
          <div
            v-if="item.id !== 'mean'"
            class="inp-box"
          >
            <el-input
              v-if="item.valueType === 'string'"
              v-model="scope.row[item.id]"
              :class="item.title === '参数名' ? 'input' : ''"
              placeholder="请输入"
            />
            <el-select
              v-if="item.valueType === 'select'"
              v-model="scope.row[item.id]"
              placeholder="请选择"
            >
              <el-option
                v-for="v in options"
                :key="v.value"
                v-show="item.title === v.isShow"
                :label="v.title"
                :value="v.value"
              />
            </el-select>
          </div>
          <div
            v-else
            class="inp-box"
          >
            <Upload
              v-if="scope.row.type === 'file'"
              @uploaded="fileUploadSuccess"
            />
            <el-input
              v-else
              v-model="scope.row[item.id]"
              :class="item.title === '参数名' ? 'input' : ''"
              placeholder="请输入"
              :type="scope.row.type === 'integer' ? 'number' : 'string'"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :label="item.title"
        :width="item.width"
      >
        <template #default="scope">
          <span
            v-for="v in item.operation"
            :key="v.title"
            :class="v.class"
            @click="clickOperationBtn(v.type, scope.row)"
          >{{ v.title }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
import { Plus } from '@element-plus/icons-vue'
import Upload from '@/components/utils/upload-component.vue'

export default {
  props: {
    datatable: { type: Array, default: () => [] },
    hearder: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] }
  },
  emits: ['operationBtn', 'undate-file'],
  components: { Plus, Upload },
  setup (props: any, { emit }: any) {
    const clickOperationBtn = (type: string, row: object) => {
      emit('operationBtn', type, row)
    }
    function fileUploadSuccess (file:Object) {
      emit('undate-file', file)
    }
    return {
      clickOperationBtn,
      fileUploadSuccess
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-table{
  .inp-box{
    width: 100%;
  }
  .cell{
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-table__expand-icon{
      width: 20px;
    }
    .input{
      flex: 1;
    }
  }
  .add-list{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #409eff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 16px;
    margin-top: 2px;
    cursor: pointer;
    .el-icon{
      color: #fff;
    }
  }
}
</style>
