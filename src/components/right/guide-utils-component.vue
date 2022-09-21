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
        {{ utilitiesNmae }}
        <span>更新时间：2022年09月08日</span>
      </h1>
      <Table
        :datatable="props.dataobj.contentList"
        :data-hearder="props.dataobj.titleList"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Table from '@/components/utils/table-component.vue'
import Breadcrumb from '@/components/utils/breadcrumb-component.vue'
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  },
  utilitiesNmae: { type: String, default: '' },
  apiNameString: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.API-content {
  width: calc(100% - 221px);
  float: left;
  // overflow: auto;
  margin-left: 10px;
  margin-right: 10px;
  .API-description {
    span {
      color: #767676;
      font-size: 14px;
    }
  }
  h1 {
    font-size: 1.4em;
    color: #292929;
    font-weight: 400;
    span {
      color: #afb1b0;
      font-size: 12px;
      font-weight: 400;
      display: block;
      margin: 17px 0 0;
    }
  }
}
</style>
