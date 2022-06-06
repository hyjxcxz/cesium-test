<template>
  <div class="project-page">
    <Header />
    <div id="ProjectMapContainer" />
    <!-- 应该每次进入这个页面调接口获取一次项目信息，不然刷新就啥也没有了 -->
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import Header from '@/components/home/header.vue'
import gwmap from '@/gwmap/index'
import { useStore } from '@/store/index'
export default {
  name: 'ProjectPage',
  components: {
    Header
  },
  setup () {
    const store = useStore()
    setTimeout(() => {
      // 不展示指南针及放大缩小等功能
      const dom:any = document.getElementsByClassName('navigation-controls')[0]
      const compass:any = document.getElementsByClassName('compass')[0]
      dom.style.display = 'none'
      compass.style.display = 'none'
    })
    onMounted(() => {
      gwmap.initProjectMap('ProjectMapContainer')
    })
    return {
      store
    }
  }
}
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
