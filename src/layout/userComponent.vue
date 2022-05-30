<template v-slot:dropdown>
  <el-dropdown
    size="small"
    class="user-content"
  >
    <span>{{ 'a' ? `你好!管理员 ` : '未登录' }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOff">
          注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
export default {
  name: 'UserComponent',
  /**
     * @description 登出
     */
  setup (props:any) {
    function logOff () {
      console.log('注销成功!!!')
    }
    return {
      logOff
    }
  }

}
</script>
