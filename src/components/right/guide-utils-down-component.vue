<template>
  <div
    v-if="dataobj"
    class="guide-content API-content"
  >
    <h1>
      {{ utilitiesNmae }}
      <span>更新时间：2022年09月06日</span>
    </h1>
    <div
      v-for="(item,index) in props.dataobj"
      :key="index"
    >
      <h2>
        {{ item.name }}
      </h2>
      <div class="API-description">
        <span>{{ item.description }}</span>
      </div>
      <el-tooltip
        class="box-item"
        :content="item.name+'下载'"
        placement="top"
      >
        <el-button
          class="iconfont icon-yunduanxiazai download"
          @click="download(item.url)"
        />
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  dataobj: {
    type: Object,
    default () {
      return {}
    }
  },
  utilitiesNmae: { type: String, default: '' }
})
function download (url:string) {
  window.location.href = url
}
</script>
<style lang="scss" scoped>
.API-content {
  width: calc(100% - 221px);
  float: left;
  overflow: auto;
  margin-left: 10px;
  margin-right: 10px;
  .API-description {
    span {
      color: #767676;
      font-size: 14px;
    }
  }
  .download{
    float:right;
    color:#fff;
    font-size:20px;
    background:#42a5f5;
    margin-right:40px;
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
  h2 {
    border-bottom: 1px solid #ddddde;
    // font-size: 1.2em;
    // color: #000;
    font-size: 18px;
    font-weight: 400;
    color: #3c3d3f;
  }
}
</style>
