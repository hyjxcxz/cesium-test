<template>
  <div class="screen-input">
    <el-input
      class="input-with-select"
      v-model="searchWord"
      :placeholder="searchPlaceholder"
      @change="searchClick"
    >
      <template #prepend>
        <el-select
          v-model="select"
          class="select-button"
          style="width: 105px"
          @change="handlerChange"
        >
          <el-option
            v-for="item in props.searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #append>
        <el-button
          :icon="Search"
          circle
          @click="searchClick"
        />
      </template>
    </el-input>
  </div>
</template>
<script lang="ts" >
import { ref } from 'vue'
import {
  Search
} from '@element-plus/icons-vue'
export default {
  name: 'SearchComponent',
  emits: ['search-click'],
  props: {
    placeholder: { type: String, default: '搜索' },
    searchOptions: {
      type: Array, default () { return [] }
    }
  },
  setup (props:any, { emit }:any) {
    const searchWord = ref('')
    const searchPlaceholder = ref(props.placeholder)
    const select = ref(props.searchOptions[0].label)
    function searchClick () {
      searchWord.value = Trim(searchWord.value, 'g')
      function Trim (str:string, global: string) {
        let result = ''
        result = str.replace(/(^\s+)|(\s+$)/g, '')
        if (global.toLowerCase() === 'g') {
          result = result.replace(/\s/g, '')
        }
        return result
      }
      emit('search-click', searchWord.value)
    }
    function handlerChange (e:string) {
      if (e === 'projectName') {
        searchPlaceholder.value = '输入项目名称查找'
      } else if (e === 'projectNumber') {
        searchPlaceholder.value = '输入项目编号查找'
      }
    }
    return {
      Search,
      props,
      searchWord,
      searchClick,
      select,
      handlerChange,
      searchPlaceholder
    }
  }

}

</script>
<style scoped lang="scss">
.screen-input{
    margin: 10px 60px 0 0;
    width: 265px;
    height: 34px;
    border-radius: 2px;
    border: 1px solid rgba(192, 200, 255, 0.26);
    .select-button{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BCCCFF;
        background: rgba(48, 73, 254, 0.27);
    }

}
</style>
