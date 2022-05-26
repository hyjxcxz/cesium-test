<template>
  <div class="screen-input">
    <el-input
      class="input-with-select"
      v-model="searchWord"
      :placeholder="props.placeholder"
      @change="searchClick"
    >
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
    placeholder: { type: String, default: '搜索' }
  },
  setup (props:any, { emit }:any) {
    const searchWord = ref('')
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
    return {
      Search,
      props,
      searchWord,
      searchClick
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
}
</style>
