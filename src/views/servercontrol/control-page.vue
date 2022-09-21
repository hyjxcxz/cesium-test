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
      <Register />
    </template>
    <template v-else-if="APIname==='2'">
      <Register />
    </template>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/home/control-header.vue'
import Menu from '@/components/menu/menu-component.vue'
import Register from '@/components/right/register-component.vue'
// import nodataComponentVue from '@/composables/nodata/nodata-component.vue'
const guidemenu = reactive({ data: [{ id: '1', title: '服务列表' }, { id: '2', title: '服务注册' }, { id: '3', title: '应用管理' }, { id: '4', title: '额度管理' }] })
// const utilitiesDownload = reactive({ data: {} })
const APIname = ref('1')
function menuid (obj:any) {
  APIname.value = obj.id
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
