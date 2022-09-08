<template>
  <div class="example-content-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="guidemenu[0].children[0].id"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      ref="elMenu"
      @select="handleSelect"
    >
      <menu-tree :menu-data="guidemenu" />
    </el-menu>
  </div>
</template>
<script lang="ts">
import MenuTree from '@/components/menu/menu-tree.vue'
export default {
  props: {
    guidemenu: { type: Array, default () { return [] } }
  },
  components: { MenuTree },
  emits: ['menu-id'],
  setup (props: any, { emit }:any) {
    function handleSelect (key:string, keyPath:any) {
      const obj = {
        parent: keyPath[0],
        id: key
      }
      emit('menu-id', obj)
    }
    return {
      handleSelect
    }
  }

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
