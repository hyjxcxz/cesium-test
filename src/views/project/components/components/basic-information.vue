<template>
  <ul
    class="project-left-content-item-content"
  >
    <li
      v-for="v in fanInfoTab"
      :key="v.title + v.code"
      class="project-left-content-item-content-first"
    >
      <el-checkbox
        v-model="v.checked"
        :label="v.title"
        @change="changeFanTab(v)"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const fanInfoTab = reactive([
  {
    title: '道路',
    code: 1,
    checked: false
  }, {
    title: '线路',
    code: 2,
    checked: false
  }, {
    title: '升压站',
    code: 3,
    checked: false
  }, {
    title: '测风雷达',
    code: 4,
    checked: false
  }, {
    title: '规划风机',
    code: 5,
    checked: false
  }, {
    title: '规划地形',
    code: 6,
    checked: false
  }
])
function changeFanTab (val:any) {
  fanInfoTab.forEach(item => {
    if (val.code === item.code) {
      val = item
    }
  })
  if (val.code === 3) {
    if (val.checked) {
      console.log(1)
    } else {
      console.log(2)
    }
  }
}
</script>

<style scoped lang="scss">
.project-left-content-item-content{
  margin: 0;
  padding: 0;
  color: #fff;
  li{
    list-style-type: none;
  }
  .project-left-content-item-content-first{
    padding: 0 16px;
  }
}
</style>
