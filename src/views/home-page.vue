<template>
  <div class="home">
    <Header />
    <!-- <div id="mapContainer" /> -->
    <!-- <popupRightBox /> -->
    <div class="menue">
      <router-link to="/">
        首页
      </router-link>
      <router-link to="/interface">
        概述
      </router-link>
      <router-link to="/guide">
        开发指南
      </router-link>
      <router-link to="/about">
        关于
      </router-link>
      <!-- <userinfor></userinfor> -->
    </div>
  </div>
  <infoPopup
    :info="info"
    v-if="isShowPopup"
  />
  <!-- 接口实验（长青线接口路径对，没登录会报500） -->
  <!-- <testComponetVue /> -->
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { requestApi } from '@/utils/request-util'
import infoPopup from '@/components/info-popup.vue'
// import { useStore } from '@/store/index'
import Header from '@/components/home/home-header.vue'
const isShowPopup = ref(false)
// const store = useStore()
function getSearchData () {
  requestApi(
    'getbaseInfos',
    null,
    (res: any) => {
      setTimeout(() => {
        // gwmap.fanLayer.load()
        // res.data.forEach((item:Object) => {
        //   gwmap.fanLayer.add(item, 'windFarm')
        // })
      }, 200)
    }, ['', '']
  )
}
// function clearAll () {

// }
onMounted(() => {
  // gwmap.init('mapContainer')
  getSearchData()
})
watchEffect(() => {

})

</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  #mapContainer{
    width: 100vw;
    height: 100%;
    .cesium-viewer{
      width: 100%;
      height: 100%;
    }
    .cesium-viewer-cesiumWidgetContainer{
      width: 100%;
      height: 100%;
    }
    .cesium-widget{
      width: 100%;
      height: 100%;
    }
    .cesium-widget canvas {
      width: 100%;
      height: 100%;
      touch-action: none;
    }
  }
}
</style>
