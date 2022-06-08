<template>
  <div class="measuring-tools">
    <!-- <el-radio-group
      v-model="checked"
      @change="controlsClick"
    >
      <el-radio
        v-for="item in tabList"
        :key="item.code + item.title"
        :label="item.code"
        size="large"
      >
        {{ item.title }}
      </el-radio>
    </el-radio-group> -->
  </div>
</template>

<script lang="ts" setup>
// import { ref, reactive } from 'vue'
// import gwmap from '@/gwmap/index'
// const checked = ref(null)
// const tabList = reactive([
//   {
//     title: '测面',
//     code: 1
//   }, {
//     title: '测距',
//     code: 2
//   }, {
//     title: '清除',
//     code: 3
//   }
// ])

// function controlsClick () {
//   if (checked.value === 1) {
//     gwmap.mapControlManager.active('measureArea')
//   } else if (checked.value === 2) {
//     gwmap.mapControlManager.active('measureLength')
//   } else if (checked.value === 3) {
//     gwmap.mapControlManager.disactive('measure')
//   }
// }
</script>

<style scoped lang="scss">
.measuring-tools{
  width: 390px;
  height: 100%;
  background: rgba(#141726,0.7);
  border-left:1px solid rgba(#C0C8FF,0.4);
  padding: 0 5px;
}
</style>
