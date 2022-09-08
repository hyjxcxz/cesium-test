<template>
  <div>
    <template v-for="menu in menuData">
      <el-menu-item
        class="menu-item"
        v-if="!menu.children"
        :key="menu.id"
        :index="menu.id"
      >
        <!-- <i :class="menu.icon" /> -->
        <span>{{ menu.title }}</span>
      </el-menu-item>
      <el-sub-menu
        class="submenu"
        :key="menu.id+'q'"
        :index="menu.id"
        v-if="menu.children"
      >
        <template #title>
          <!-- <i :class="menu.icon" /> -->
          <span>{{ menu.title }}</span>
        </template>
        <menu-tree :menu-data="menu.children" />
      </el-sub-menu>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    menuData: { type: Array, default () { return [] } }
  }
}
</script>
<style lang="scss" scoped>
.submenu,
.menu-item {
  text-align: left;
  i {
    margin-right: 10px;
    color: #ffffff;
  }
}
</style>
