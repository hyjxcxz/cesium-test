<template>
  <div class="project-right">
    <ul>
      <li
        v-for="item in tabList"
        :key="item.code + item.title"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const tabList = reactive([
  {
    title: '项目信息',
    code: 1
  }, {
    title: '机组履历',
    code: 2
  }, {
    title: '物流运输',
    code: 3
  }, {
    title: '风险评估',
    code: 4
  }
])
</script>

<style scoped lang="scss">
.project-right{
  position: fixed;
  top: 50px;
  right: 20px;
  width: 60px;
  height: calc(100% - 50px);
  border-right: 1px solid;
  border-image: linear-gradient(to bottom right,#C8C8C8 40%,#979797 100%,#C2C2C2 40%) 1;
  ul{
    margin: 0;
    padding: 0;
    li{
      color: #fff;
      list-style-type: none;
    }
  }
}
</style>
