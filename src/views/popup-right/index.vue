<template>
  <!--右侧弹窗的盒子  -->
  <div class="popup-right-box">
    <div class="function-box">
      <div class="tab-box">
        <span
          v-for="item in tabData"
          :key="item.code"
          @click="changeTab(item)"
          :class="item.checked ? item.class + 'Checked' : item.class"
        />
      </div>
      <HomeLegend />
    </div>
    <ResourceManagement v-if="activePage === 'resourceManagement'" />
    <DataManagement v-if="activePage === 'dataManagement'" />
    <MeasuringTools v-if="activePage === 'measuringTools'" />
  </div>
</template>

<script>
import ResourceManagement from './resource-management.vue'
import DataManagement from './data-management.vue'
import MeasuringTools from './measuring-tools.vue'
import HomeLegend from './components/home-legend.vue'

import { reactive, ref } from 'vue'
export default {
  name: 'PopupRightBox',
  components: {
    ResourceManagement,
    DataManagement,
    MeasuringTools,
    HomeLegend
  },
  setup () {
    const activePage = ref('resourceManagement')
    const tabData = reactive([
      {
        code: 1,
        title: '资源管理',
        checked: true,
        icon: 'icon-fengdian1',
        class: 'resourceManagement',
        img: '/images/home/resourceManagement.svg',
        imgActive: '/images/home/resourceManagementActive.svg'
      }, {
        code: 2,
        title: '数据管理',
        checked: false,
        icon: 'icon-shuju',
        class: 'dataManagement',
        img: '/images/home/dataManagement.svg',
        imgActive: '/images/home/dataManagementActive.svg'
      }, {
        code: 3,
        title: '测量工具',
        checked: false,
        icon: 'icon-gongjuxiang',
        class: 'measuringTools',
        img: '/images/home/measuringTools.svg',
        imgActive: '/images/home/measuringToolsActive.svg'
      }
    ])

    function changeTab (val) {
      activePage.value = val.class
      tabData.map(item => {
        if (item.title === val.title) {
          item.checked = !val.checked
          if (item.checked) {
            activePage.value = val.class
          } else {
            activePage.value = ''
          }
        } else {
          item.checked = false
        }
        return item
      })
    }
    return {
      tabData,
      changeTab,
      activePage
    }
  }
}
</script>

<style scoped lang="scss">
.popup-right-box{
  height: calc(100% - 52px);
  position: fixed;
  top: 51px;
  right:0;
  display: flex;
  flex-direction: row;
  .function-box{
    position: relative;
    margin-right: 10px;
    height: 100%;
    .tab-box{
      position: absolute;
      right: 0;
      span{
        cursor:pointer;
      }
    }
  }
}
</style>
