<template>
  <div class="home-legend">
    <p
      class="legend-item"
      v-for="item in legendData"
      :key="item.code"
    >
      <i
        class="iconfont"
        :class="item.icon"
      />
      <span class="legend-title">{{ item.title }}</span>
      <span class="legend-num">{{ item.num }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  name: 'HomeLegend',
  setup () {
    const legendData = reactive([
      {
        code: 1,
        num: 200,
        title: '风电场',
        icon: 'icon-fengdian1'
      }, {
        code: 2,
        num: 20,
        title: '制造工厂',
        icon: 'icon-fl-dian'
      }, {
        code: 3,
        num: 15,
        title: '高压电站',
        icon: 'icon-zonghe'
      }, {
        code: 4,
        num: 30,
        title: '高压线路',
        icon: 'icon-zonghe'
      }
    ])
    return {
      legendData
    }
  }
}
</script>

<style scoped lang="scss">
.home-legend{
  width: 110px;
  height: 106px;
  border-radius: 2px;
  background: rgba(0,0,0,0.4);
  border: 1px solid #C0C8FF;
  color: #30F9FE;
  position: absolute;
  bottom: 57px;
  right: 0;
  padding: 5px 16px;
  .legend-item{
    margin: 0;
    line-height: 24px;
    .legend-title{
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #BCCCFF;
      padding: 0 10px;
    }
    .legend-num{
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #30F9FE;
    }
  }
}
</style>
