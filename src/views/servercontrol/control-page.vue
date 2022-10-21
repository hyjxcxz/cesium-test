<template>
  <Header />
  <div class="content">
    <Menu
      v-if="guidemenu.data[0].id"
      :guidemenu="guidemenu.data"
      :defaultid="guidemenu.data[0].id"
      @menu-id="menuid"
    />
    <template v-if="APIname==='1'">
      <!-- <Register /> -->
      <serviceList />
    </template>
    <template v-else-if="APIname==='2'">
      <ApplicationManagement />
    </template>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/home/control-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import ApplicationManagement from './application-management/application-management-list.vue'
import serviceList from './server-list-page.vue'
// import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const guidemenu = reactive({ data: [{ id: '1', title: '服务管理' }, { id: '2', title: '应用管理' }] })
// const utilitiesDownload = reactive({ data: {} })
const APIname = ref('1')
function menuid (obj:any) {
  APIname.value = obj.id
}
</script>
<style>
</style>
