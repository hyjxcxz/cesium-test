<template>
  <Header />
  <div class="content">
    <Menu
      :guidemenu="guidemenu.data"
      @menu-id="menuid"
    />
    <template v-if="APIname==='apiDocument'">
      <Guide-API
        v-if="guideAPIdata.data.name"
        :dataobj="guideAPIdata.data"
      />
    </template>
    <template v-else-if="APIname==='utilities'">
      <Guide-API
        v-if="utilitiesAPI.data"
        :dataobj="utilitiesAPI"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/home/home-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import GuideAPI from '@/components/right/guide-component.vue'
import { requestApi } from '@/utils/request-util'
const guidemenu = reactive({ data: [] })
const guideAPIdata:Object = reactive({ data: {} })
const utilitiesAPI:Object = reactive({ data: {} })
const APIname = ref('apiDocument')
const apiID = ref('')
requestApi(
  'developGuideMenu',
  null,
  (res:any) => {
    if (res.message === 'OK' && res.data) {
      guidemenu.data = res.data
      apiID.value = guidemenu.data[0].children[0].id
      queryAPi()
    }
  }, null)
function menuid (obj:Object) {
  switch (obj.parent) {
    case 'apiDocument':
      APIname.value = 'apiDocument'
      break
    case 'utilities':
      APIname.value = 'utilities'
      break
  }
  apiID.value = obj.id
  queryAPi()
}
function queryAPi () {
  requestApi(
    APIname.value,
    null,
    (res:any) => {
      if (res.message === 'OK' && res.data) {
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
.content{
  width: 100vw;
  height: calc(100vh - 60px);
  top:60px;
  position:fixed;
}
</style>
