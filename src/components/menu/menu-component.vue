<template>
  <div class="example-content-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="props.guidemenu[0].children[0].id"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      ref="elMenu"
      @select="handleSelect"
    >
      <menu-tree :menu-data="props.guidemenu" />
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import MenuTree from '@/components/menu/menu-tree.vue'
// import Examplemenudata from '@/assets/json/Example-menu.json'
const props = defineProps({
  guidemenu: { type: Array, default () { return [] } }
})
const emits = defineEmits(['menu-id'])
function handleSelect (key, keyPath) {
  const obj = {
    parent: keyPath[0],
    id: key
  }
  emits('menu-id', obj)
}
</script>
<style lang="scss" scoped>
  .example-content-menu {
    float: left;
    width: 201px;
    height: 100%;
    background-color: #000000;
    overflow: auto;
    max-height: 100%;
  }
</style>
