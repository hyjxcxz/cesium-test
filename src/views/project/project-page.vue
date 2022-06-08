<template>
  <div class="project-page">
    <Header />
    <div id="ProjectMapContainer" />
    <!-- 应该每次进入这个页面调接口获取一次项目信息，不然刷新就啥也没有了 -->
    <ProjectLeft />
    <ProjectRight />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import gwmap from '@/gwmap/index'
import { useStore } from '@/store/index'
import { requestApi } from '@/utils/request-util'

import Header from '@/components/home/home-header.vue'
import ProjectLeft from './components/project-left.vue'
import ProjectRight from './components/project-right.vue'
const store = useStore()
const route = useRoute()
setTimeout(() => {
  // 不展示指南针及放大缩小等功能
  const dom:any = document.getElementsByClassName('navigation-controls')[0]
  const compass:any = document.getElementsByClassName('compass')[0]
  dom.style.display = 'none'
  compass.style.display = 'none'
})
function getDetail () {
  requestApi(
    'getWindfarmDetail',
    null,
    (res: any) => {
      if (res.code === 200) {
        store.commit('wind/setWindfarmDetail', res.data)
        gwmap.dataManager.flyToLocation(res.data.lng, res.data.lat)
      } else {
        store.commit('wind/setWindfarmDetail', {})
      }
    }, [route.query.id]
  )
}

function projectPageClose () {
  store.commit('wind/setWindfarmDetail', {})
}

onMounted(() => {
  gwmap.initProjectMap('ProjectMapContainer')
  getDetail()
})

onBeforeUnmount(() => {
  projectPageClose()
})
</script>

<style scoped lang="scss">
.project-page{
  width: 100%;
  height: 100%;
  #ProjectMapContainer{
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
