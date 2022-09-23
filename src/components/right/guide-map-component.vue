<template>
  <div class="API-content">
    <Breadcrumb
      v-if="props.apiNameString!==''"
      :breads="props.apiNameString"
    />
    <div
      v-if="dataobj"
      class="guide-content"
    >
      <h1>
        {{ props.dataobj.name }}
        <span>更新时间：2022年09月07日</span>
      </h1>
      <h2>产品说明</h2>
      <div
        class="API-description"
        v-for="(item, index) in props.dataobj.descriptionList"
        :key="index + 'a'"
      >
        <span>{{ item }}</span>
      </div>
      <h2>地图服务列表</h2>
      <Table
        :datatable="props.dataobj.apiList"
        :data-hearder="tableObj"
      />
    </div>
    <div v-else>
      <nodataComponentVue :data="nodata" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Breadcrumb from '@/components/utils/breadcrumb-component.vue'
import Table from '@/components/utils/table-component.vue'
import nodataComponentVue from '@/composables/nodata/nodata-component.vue'

const nodata = ref('暂无数据')
const tableObj = reactive([
  { title: '服务名称', id: 'name' },
  { title: '图层', id: 'layerName' },
  { title: '类型', id: 'type' },
  { title: '服务地址', id: 'url' }
])
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  },
  apiNameString: {
    type: String,
    default: ''
  }
})

</script>
<style lang="scss" scoped>
.API-content {
  font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  width: calc(100% - 221px);
  float: left;
  margin-left: 10px;
  margin-right: 10px;
  .API-description {
    margin: 0.8rem 0;
    span {
      // color: #767676;
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  h1 {
    font-size: 1.2em;
    font-weight: bold;
    color: rgb(51, 51, 51);
    white-space: normal;
    font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
    span {
      color: #949695;
      font-size: 12px;
      font-weight: bold;
      display: block;
      margin: 17px 0 0;
    }
  }
  h2 {
    border-bottom: 1px solid #ddddde;
    // font-size: 1.2em;
    // color: #000;
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  h3 {
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  .API-URL {
    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
    }
    li {
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddddde;
      border-left: 1px solid #ddddde;
      border-right: 1px solid #ddddde;
      span {
        display: inline-block;
        height: 37px;
        line-height: 37px;
        padding: 2px 5px;
        // color: #767676;
        color: rgb(51, 51, 51);
        font-size: 14px;
      }
      span:first-child {
        width: 80px;
        border-right: 1px solid #ddddde;
      }
    }
    li:last-child {
      border-bottom: 1px solid #ddddde;
    }
  }
  .API-apiurl {
    background: #f7f7f7;
    width: calc(100% - 20px);
    margin: 10px 0;
    padding: 5px 10px;
    color: rgb(51, 51, 51);;
    span {
      padding: 5px 10px;
      // color: #767676;
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  .API-run {
    margin: 10px auto 20px 10px;
  }
  .API-result {
    min-height: 50px;
    border: 1px solid #ddddde;
    margin: 10px 0;
  }
}
</style>
