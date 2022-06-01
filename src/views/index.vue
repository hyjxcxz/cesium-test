<template>
  <div class="home">
    <Header />
    <div id="mapContainer" />
    <popupRightBox />
  </div>
  <infoPopup
    :info="info"
    v-if="isShowPopup"
  />
  <ProjectInfo />
  <!-- 接口实验（长青线接口路径对，没登录会报500） -->
  <!-- <testComponetVue /> -->
</template>

<script lang="ts">
import { ref, onMounted, reactive, watchEffect } from 'vue'
import { requestApi } from '@/utils/request-util'
import gwmap from '@/gwmap/index'
import popupRightBox from './popup-right/index.vue'
import infoPopup from '@/components/info-popup.vue'
import { useStore } from '@/store/index'
import ProjectInfo from './project/components/project-info.vue'
// import testComponetVue from '@/components/right/testComponet.vue'
import Header from '@/components/home/header.vue'
export default {
  name: 'HomeMapContainer',
  components: {
    popupRightBox,
    infoPopup,
    ProjectInfo,
    // testComponetVue,
    Header
  },
  setup () {
    const isShowPopup = ref(false)
    const store = useStore()
    const info = reactive({
      title: '风场基本信息',
      class: 'default', // default 风场 factory 工厂
      data: [
        {
          key: '风场名称：',
          value: ''
        }, {
          key: '经度：',
          value: ''
        }, {
          key: '纬度：',
          value: ''
        }
        // {
        //   key: '行政区划：',
        //   value: '河北省张家口市'
        // }, {
        //   key: '业主名称：',
        //   value: '张家口红松风场'
        // }, {
        //   key: '状态：',
        //   value: '已建',
        //   status: true
        // }, {
        //   key: '并网时间：',
        //   value: '20180324'
        // }
      ],
      datas: [], // 聚合点位后的多个数据
      x: 0, // 弹窗定位位置
      y: 0,
      num: 216,
      id: 0
    }) // 场区详情弹框数据

    function getSearchData () {
      requestApi(
        'getbaseInfos',
        null,
        (res: any) => {
          setTimeout(() => {
            gwmap.fanLayer.load()
            res.data.forEach((item:Object) => {
              gwmap.fanLayer.add(item)
            })
          }, 200)
        }, ['', '']
      )
    }
    onMounted(() => {
      gwmap.init('mapContainer')
      getSearchData()
    })
    watchEffect(() => {
      if (store.state.app.clickFanList.arr && store.state.app.clickFanList.arr.length > 0) {
        const obj:any = reactive(store.state.app.clickFanList.arr[0])
        isShowPopup.value = true
        // contractno: "false"
        // id: 17707
        // odoo_id: 68418
        // opportunity: ""
        // schedule: "false"
        // user_name: "施萍"
        // user_oa: "7796"
        // windtrump_id: 8136
        info.x = store.state.app.clickFanList.x
        info.y = store.state.app.clickFanList.y
        info.data.map((item: any) => {
          if (item.key === '风场名称：') {
            item.value = obj.project_name
          } else if (item.key === '经度：') {
            item.value = obj.longitude
          } else if (item.key === '纬度：') {
            item.value = obj.latitude
          }
          return item
        })
        info.id = obj.id
        info.datas = []
        info.num = 216
        if (store.state.app.clickFanList.arr.length > 1) {
          info.num = 240
          info.datas = store.state.app.clickFanList.arr
        }
      } else {
        isShowPopup.value = false
        info.datas = []
      }
    })
    return {
      info,
      isShowPopup,
      getSearchData
    }
  }
}
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
