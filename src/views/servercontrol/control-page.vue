<template>
  <Header />
  <div class="content">
    <Menu
      v-if="guidemenu.data[0].id"
      :guidemenu="guidemenu.data"
      :defaultid="guidemenu.data[0].id"
      @menu-id="menuid"
    />
    <template v-if="APIname==='apiDocument'">
      <Guide-API
        v-if="guideAPIdata.data"
        :dataobj="guideAPIdata.data"
      />
    </template>
    <template v-else-if="APIname==='utilities'">
      <template v-if="utilitiesAPI.data">
        <GuideUtils
          v-if="(utilitiesAPI.data.titleList&&utilitiesAPI.data.titleList.length>0)"
          :dataobj="utilitiesAPI.data"
          :utilities-nmae="utilitiesNmae"
        />
        <GuideUtilsDown
          v-else
          :dataobj="utilitiesAPI.data"
          :utilities-nmae="utilitiesNmae"
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
import Header from '@/components/home/control-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import GuideAPI from '@/components/right/guide-component.vue'
import GuideUtils from '@/components/right/guide-utils-component.vue'
import GuideUtilsDown from '@/components/right/guide-utils-down-component.vue'
import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const guidemenu = reactive({ data: [{ id: '1', title: '服务注册' }, { id: '2', title: '服务列表' }, { id: '3', title: '应用管理' }, { id: '4', title: '额度管理' }] })
const guideAPIdata = reactive({ data: { returnList: [] } })
const utilitiesAPI = reactive({ data: { titleList: [] } })
// const utilitiesDownload = reactive({ data: {} })
const nodata = ref('暂无数据')
const APIname = ref('apiDocument')
const utilitiesNmae = ref('')
</script>
<style>
.content{
  width: 100vw;
  height: calc(100vh - 60px);
  top:60px;
  position:fixed;
}
</style>
