<template>
  <div
    v-if="dataobj"
    class="API-content"
  >
    <h1>{{ props.dataobj.name }}</h1>
    <h2>产品说明</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.descriptionList"
      :key="index + 'a'"
    >
      <span>{{ item }}</span>
    </div>
    <h2>适用场景</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.scenesList"
      :key="index + 'b'"
    >
      <span>{{ item }}</span>
    </div>
    <h2>使用说明</h2>
    <div
      class="API-description"
      v-for="(item, index) in props.dataobj.introductionList"
      :key="index + 'c'"
    >
      <span>{{ item }}</span>
    </div>
    <h3><ul><li>{{ props.dataobj.name }}API URL</li></ul></h3>
    <div class="API-URL">
      <ul>
        <li>
          <span>URL</span><span>{{ props.dataobj.address }}</span>
        </li>
        <li>
          <span>请求方式</span><span>{{ props.dataobj.mode }}</span>
        </li>
      </ul>
    </div>
    <h3><ul><li>请求参数</li></ul></h3>
    <Table
      :datatable="props.dataobj.paramList"
      :data-hearder="tableObj"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import Table from '@/components/utils/table-component.vue'
const tableObj = reactive([
  { label: '参数名', prop: 'name' },
  { label: '类型', prop: 'type' },
  { label: '含义', prop: 'mean' },
  { label: '规则说明', prop: 'rule' },
  { label: '是否必填', prop: 'required' },
  { label: '缺省值', prop: 'defaultValue' }
])
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  }
})
</script>
<style lang="scss" scoped>
.API-content {
  width: calc(100% - 211px);
  float: left;
  height: 100% ;
  overflow: auto;
  margin-left:10px;
  h1{
    font-size: 1.4em;
  }
  h2{
    border-bottom: 1px solid #ddddde;
    font-size: 1.2em;
    color: #000;
  }
  h3{
    font-size: 1em;
  }
  .API-URL{
    ul{
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      margin-right:10px;
    }
    li{
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddddde;
      border-left: 1px solid #ddddde;
      border-right: 1px solid #ddddde;
      span{
        display:inline-block;
        height:37px;
        line-height:37px;
        padding:2px 5px;
      }
      span:first-child{
        width:80px;
        border-right: 1px solid #ddddde;
      }
    }
    li:last-child{
       border-bottom: 1px solid #ddddde;
    }
  }
}
</style>
