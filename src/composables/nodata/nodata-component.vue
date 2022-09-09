<template>
  <div class="standing-book-content">
    <img
      src="/images/noData.svg"
      alt=""
    >
    <span>{{ props.data }}!</span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  data: { type: String, default: '暂无数据' }
})
</script>
<style scoped lang="scss">
 .standing-book-content{
  width: calc(100% - 221px);
  float: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    letter-spacing: 1px;
    text-align: center;
    img{
      max-height: 50%;
      margin: 10% auto 0;
    }
    span{
      color: #BCCCFF;
      height: 10%;
      width: 100%;
      vertical-align: middle;
    }
  }</style>
