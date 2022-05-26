<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-left">
        <img
          class="logo"
          src="https://windit.s3.cn-north-1.amazonaws.com.cn/logo-goldwind/gold-en-level-white.svg"
          alt=""
        >
        <div class="division" />
        <span class="project-title">风场信息化数据平台</span>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-title">
          <el-tooltip
            content="全屏展开"
            effect="dark"
            placement="bottom"
            v-if="!isFullScreen"
          >
            <i
              class="iconfont icon-quanping1"
              @click="fullScreen()"
            />
          </el-tooltip>
          <el-tooltip
            content="退出全屏"
            effect="dark"
            placement="bottom"
            v-else
          >
            <i
              class="iconfont icon-tuichuquanping"
              @click="exitFullscreen()"
            />
          </el-tooltip>
          <!-- 用户信息 -->
          <userComponentVue />
        </div>
      </div>
    </div>
    <div id="mapContainer" />
    <popupRightBox />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import gwmap from '../gwmap'
import popupRightBox from './popup-right/index.vue'
import userComponentVue from '@/layout/userComponent.vue'
export default {
  name: 'HomeMapContainer',
  components: {
    popupRightBox,
    userComponentVue
  },
  setup () {
    const isFullScreen = ref(false)
    onMounted(() => {
      gwmap.init('mapContainer')
    })
    function fullScreen () {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      }
      isFullScreen.value = true
    }
    function exitFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      isFullScreen.value = false
    }

    return {
      isFullScreen,
      fullScreen,
      exitFullscreen
    }
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  .home-header{
    position: fixed;
    width: 100%;
    height: 50px;
    background: rgba(#373F72,0.5);
    border-bottom:1px solid;
    border-image: linear-gradient(to bottom right,#C8C8C8 40%,#979797 100%,#C2C2C2 40%) 1;
    display: flex;
    flex-direction: row;
    z-index: 1;
    .home-header-left{
      flex:1;
      height: 100%;
      line-height: 50px;
      .logo{
        height: 26px;
        margin:11.5px 18px;
      }
      .division{
        display: inline-block;
        position: absolute;
        top: 12px;
        height: 26px;
        border-right:2px solid rgba(#979797,0.5);
      }
      .project-title{
        margin-left: 18px;
        position: absolute;
        display: inline-block;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #BCCCFF;
        letter-spacing: 1px;
      }

    }
    .home-header-right{
      flex:1;
      .home-header-right-title{
        margin-right: 18px;
        color: #EBEEE7;
        float: right;
        height: 100%;
      .iconfont{
        float: left;
        color: #EBEEE7;
        font-size: 22px;
        margin-top: 13px;
        cursor:pointer;
      }
      .user-content{
        float: left;
        cursor: pointer;
        color: #EBEEE7;
        height: 100%;
        line-height: 50px;
        margin: auto 20px;
      }
      }
    }
  }
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
