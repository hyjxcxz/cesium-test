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
        :api-name-string="'您现在的位置：基础数据服务,开发指南,'+apiNameString"
      />
      <template v-else>
        <nodataComponentVue :data="nodata" />
      </template>
    </template>
    <template v-else-if="APIname==='utilities'">
      <template v-if="utilitiesAPI.data">
        <GuideUtils
          v-if="(utilitiesAPI.data.titleList&&utilitiesAPI.data.titleList.length>0)"
          :dataobj="utilitiesAPI.data"
          :utilities-nmae="utilitiesNmae"
          :api-name-string="'您现在的位置：基础数据服务,开发指南,'+apiNameString"
        />
        <GuideUtilsDown
          v-else
          :dataobj="utilitiesAPI.data"
          :utilities-nmae="utilitiesNmae"
          :api-name-string="'您现在的位置：基础数据服务,开发指南,'+apiNameString"
        />
      </template>
      <template v-else>
        <nodataComponentVue :data="nodata" />
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/home/base-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import GuideAPI from '@/components/right/guide-component.vue'
import GuideUtils from '@/components/right/guide-utils-component.vue'
import GuideUtilsDown from '@/components/right/guide-utils-down-component.vue'
import { requestApi } from '@/utils/request-util'
import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const guidemenu = reactive({ data: [{ title: '', children: [{ title: '', id: '' }] }] })
const guideAPIdata = reactive({ data: { returnList: [] } })
const utilitiesAPI = reactive({ data: { titleList: [] } })
// const utilitiesDownload = reactive({ data: {} })
const nodata = ref('暂无数据')
const APIname = ref('apiDocument')
const apiNameString = ref('')
const apiID = ref('')
const apiparentID = ref('')
const utilitiesNmae = ref('')
requestApi(
  '',
  '',
  'developGuide',
  null,
  (res:any) => {
    if (res.message === 'OK' && res.data) {
      guidemenu.data = dealreturnList(res.data)
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
  switch (obj.parent) {
    case 'apiDocument':
      APIname.value = 'apiDocument'
      break
    case 'utilities':
      APIname.value = 'utilities'
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
        utilitiesNmae.value = item.title
        apiNameString.value = apiNameString.value + item.title
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
    APIname.value,
    null,
    (res:any) => {
      if (res.message === 'OK' && res.data) {
        if (APIname.value === 'apiDocument') {
          guideAPIdata.data = res.data
          guideAPIdata.data.returnList = dealreturnList(res.data.returnList)
        } else if (APIname.value === 'utilities') {
          utilitiesAPI.data = res.data
        }
      } else {
        if (APIname.value === 'apiDocument') {
          guideAPIdata.data = res.data
        } else if (APIname.value === 'utilities') {
          utilitiesAPI.data = res.data
        }
      }
    }, [apiID.value])
}
</script>
<style>
</style>
