<template>
  <div class="screen">
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
              v-for="item in searchOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #append>
          <el-button
            class="iconfont icon-sousuo"
            circle
            @click="searchClick"
          />
        </template>
      </el-input>
    </div>
    <SearchListComponent
      v-if="searchlist.data.length>0"
      :searchlist="searchlist.data"
    />
    <div
      v-else
      class="screen-list-nodata"
    >
      <nodataComponentVue
        v-if="showNodata"
        :data="nodata"
      />
    </div>
  </div>
</template>
<script lang="ts" >
import { ref, reactive } from 'vue'
import { requestApi } from '@/utils/request-util'
import SearchListComponent from '@/composables/searchList/searchListComponent.vue'
import nodataComponentVue from '@/composables/nodata/nodataComponent.vue'

export default {
  name: 'SearchComponent',
  emits: ['search-click'],
  components: {
    SearchListComponent,
    nodataComponentVue
  },
  props: {
    placeholder: { type: String, default: '搜索' },
    searchOptions: {
      type: Array, default () { return [] }
    }
  },
  setup (props:any, { emit }:any) {
    const nodata = ref('暂无数据')
    const showNodata = ref(false)
    const searchWord = ref('')
    const searchPlaceholder = ref(props.placeholder)
    const select = ref(props.searchOptions[0].label)
    const searchlist = reactive({
      data: []
    })
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
      if (searchWord.value) {
        showNodata.value = true
        if (select.value === '项目名称') {
          getSearchData([searchWord.value, null], (res:any) => {
            searchlist.data = res.data
          })
        } else if (select.value === '项目编号') {
          getSearchData([null, searchWord.value], (res:any) => {
            searchlist.data = res.data
          })
        }
      } else {
        showNodata.value = false
        searchlist.data = []
      }
      // emit('search-click', searchWord.value)
    }
    function getSearchData <T> (param: T, calback:any) : T {
      return requestApi(
        'getbaseInfos',
        null,
        (res: any) => {
          calback(res)
        }, param)
    }
    function handlerChange (e:string) {
      if (e === 'projectName') {
        searchPlaceholder.value = '输入项目名称查找'
      } else if (e === 'projectNumber') {
        searchPlaceholder.value = '输入项目编号查找'
      }
    }
    return {
      props,
      searchWord,
      searchClick,
      select,
      handlerChange,
      searchPlaceholder,
      searchlist,
      getSearchData,
      nodata,
      showNodata
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
    :deep(.el-button){
      height: 100%;
      background: unset;
      border: unset;
      &:hover{
        color: #3049FE;
        background: #262B4D;
      }
    }
}
.screen-list-nodata{
    width: 265px;
    max-height:calc(100% - 250px) ;
    background: #262B4D;
    opacity: 0.8;
}
</style>
