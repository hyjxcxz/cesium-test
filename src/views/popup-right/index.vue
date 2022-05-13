<template>
  <!--右侧弹窗的盒子  -->
  <div class="popup-right-box">
    <div class="function-box">
      <div class="tab-box">
        <!-- <span
          class="tab"
          v-for="item in tabData"
          :key="item.code"
          @click="changeTab(item)"
        >
          <i
            class="iconfont"
            :style="item.checked ? 'color:#30FBFE;' : ''"
            :class="item.icon"
          />
        </span> -->
        <span
          v-for="item in tabData"
          :key="item.code"
          @click="changeTab(item)"
        >
          <img :src="item.checked ? item.imgActive : item.img">
          <!-- <i
            class="iconfont"
            :style="item.checked ? 'color:#30FBFE;' : ''"
            :class="item.icon"
          /> -->
        </span>
      </div>
    </div>
    <popupRight />
  </div>
</template>

<script>
import popupRight from './popup-right.vue'
import { reactive } from 'vue'
export default {
  name: 'PopupRightBox',
  components: {
    popupRight
  },
  setup () {
    const tabData = reactive([
      {
        code: 1,
        title: '资源管理',
        checked: true,
        icon: 'icon-fengdian1',
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
      tabData.map(item => {
        if (item.title === val.title) {
          item.checked = true
        } else {
          item.checked = false
        }
        return item
      })
    }
    return {
      tabData,
      changeTab
    }
  }
}
</script>

<style scoped lang="scss">
.popup-right-box{
  height: calc(100% - 62px);
  position: fixed;
  top: 61px;
  right:0;
  display: flex;
  flex-direction: row;
  .function-box{
    height: 100%;
    .tab-box{
      width: 54px;
      span{
        cursor:pointer;
      }
    }
  }
}
</style>
