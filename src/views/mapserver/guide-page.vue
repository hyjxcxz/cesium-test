<template>
  <Header />
  <div class="content">
    <Menu
      v-if="guidemenu.data[0].children[0].id"
      :guidemenu="guidemenu.data"
      :defaultid="guidemenu.data[0].children[0].id"
      @menu-id="menuid"
    />
    <template v-else>
      <nodataComponentVue :data="nodata" />
    </template>
    <template v-if="APIname==='apiDocument'">
      <Guide-API
        v-if="guideAPIdata.data"
        :dataobj="guideAPIdata.data"
        :api-name-string="'您现在的位置：地图服务,开发指南,'+apiNameString"
      />
    </template>
    <template v-else-if="APIname==='mapguide'">
      <GuideUtilsDown
        :dataobj="utilitiesAPI.data"
        :utilities-nmae="utilitiesNmae"
        :api-name-string="'您现在的位置：地图服务,开发指南,'+apiNameString"
      />
    </template>
    <template v-else>
      <nodataComponentVue :data="nodata" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/home/mapserver-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import GuideAPI from '@/components/right/guide-map-component.vue'
// import GuideUtils from '@/components/right/guide-utils-component.vue'
import GuideUtilsDown from '@/components/right/guide-utils-down-component.vue'
import { requestApi } from '@/utils/request-util'
import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const guidemenu = reactive({ data: [{ title: '', id: '', children: [{ title: '', id: '' }] }] })
const guideAPIdata = reactive({ data: { } })
const utilitiesAPI = reactive({
  data: [{
    description: '金风能源地理信息规范，通过标准化地理信息语言和系统化的标识符号，将金风科技地理信息的服务宗旨、行为和功能传递广大用户。突出地理信息标准化服务功能，有效增强用户产品体验，强化了用户心智，提升品牌形象。',
    name: '制图规范',
    url: './vendors/金风能源地理信息制图规范V1发布版.pdf'
  }]
})
// const utilitiesDownload = reactive({ data: {} })
const nodata = ref('暂无数据')
const APIname = ref('apiDocument')
const apiID = ref('')
const apiparentID = ref('')
const apiNameString = ref('')
const utilitiesNmae = ref('')
requestApi(
  '',
  '',
  'mapdevelopGuide',
  null,
  (res:any) => {
    if (res.message === 'OK' && res.data) {
      guidemenu.data = dealreturnList(res.data)
      guidemenu.data.push({
        id: 'mapguidea',
        title: '地图规范',
        children:
         [
           { id: 'mapguide', title: '制图规范' }
         ]
      })
      apiID.value = guidemenu.data[0].children[0].id
      apiNameString.value = guidemenu.data[0].title + ',' + guidemenu.data[0].children[0].title
      queryAPi()
    }
  }, null)
function dealreturnList <T> (data:T):T {
  const datalist = data
  getchildren(datalist)
  function getchildren (arry:any) {
    arry.forEach((item:any) => {
      if (item.children === null) {
        delete item.children
      } else {
        getchildren(item.children)
      }
    })
  }
  return datalist
}
function menuid (obj:any) {
  // eslint-disable-next-line no-debugger
  debugger
  switch (obj.parent) {
    case 'apiDocument':
      APIname.value = 'apiDocument'
      break
    case 'mapguidea':
      APIname.value = 'mapguide'
      break
  }
  apiID.value = obj.id
  apiparentID.value = obj.parent
  getMenuName()
  queryAPi()
}
function getMenuName () {
  getMenue(guidemenu.data)
  function getMenue (arry:any) {
    arry.forEach((item: any) => {
      if (item.id === apiparentID.value) {
        apiNameString.value = item.title + ','
      }
      if (item.id === apiID.value) {
        // eslint-disable-next-line no-debugger
        debugger
        apiNameString.value = apiNameString.value + item.title
        utilitiesNmae.value = item.title
      } else {
        if (item.children) {
          getMenue(item.children)
        }
      }
    })
  }
}
function queryAPi () {
  requestApi(
    '',
    '',
    'map' + APIname.value,
    null,
    (res:any) => {
      if (res.message === 'OK' && res.data) {
        if (APIname.value === 'apiDocument') {
          // eslint-disable-next-line no-debugger
          debugger
          guideAPIdata.data = res.data
          // guideAPIdata.data.returnList = dealreturnList(res.data.returnList)
        }
      } else {
        if (APIname.value === 'apiDocument') {
          // eslint-disable-next-line no-debugger
          debugger
          guideAPIdata.data = res.data
        }
      }
    }, [apiID.value])
}
</script>
<style>
.content{
  width: 100vw;
  height: calc(100vh - 60px);
  top:60px;
  position:fixed;
}
</style>
