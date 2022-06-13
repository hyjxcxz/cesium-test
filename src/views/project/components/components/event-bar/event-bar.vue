<template>
  <div class="event-bar">
    <EventTimeline
      v-if="projectEvents"
      ref="timeLine"
      id="timeLine"
      :data-Source="projectEvents"
    />
  </div>
</template>

<script lang="ts" setup>
import EventTimeline from './event-timeline.vue'
import { reactive } from 'vue'

const projectEvents = reactive([
  {
    id: '47bcae1b-8266-4ab0-bafe-88e6220a0abb',
    time: '2020-02-07T05:00:00.000+0000',
    type: '干预事件',
    title: '排查方案及预防方案 排查方案及预防方案',
    describe: '下发防扫塔程序，客户对此有疑问，进行多次沟通',
    projectEventFileList: [
      {
        id: 'bf2592ba-6125-4fbb-91b9-9c8ae3472d2d',
        projectWindTurbineId: null,
        path: 'fa21f0a3-e45b-4b64-bdfb-b5eb6d1c4bfb.png',
        name: '图片4.png',
        describe: null
      }
    ]
  }, {
    id: '47bcae1b-8266-4ab0-bafe-88e6220a0111',
    time: '2020-02-07T05:00:00.000+0000',
    type: '干预事件',
    title: '排查方案及预防方案',
    describe: '下发防扫塔程序，客户对此有疑问，进行多次沟通',
    projectEventFileList: [
      {
        id: 'bf2592ba-6125-4fbb-91b9-9c8ae34721111',
        projectWindTurbineId: null,
        path: 'fa21f0a3-e45b-4b64-bdfb-b5eb6d1c4bfb.png',
        name: '图片4.png',
        describe: null
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.event-bar{
  position: fixed;
  bottom: 30px;
  left: 240px;
  width: calc(100% - 300px);
  overflow: auto;
}
</style>
